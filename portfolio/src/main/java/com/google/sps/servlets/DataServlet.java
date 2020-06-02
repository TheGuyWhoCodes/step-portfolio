// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.*;
import java.util.Arrays; 
import com.google.gson.Gson;
import java.util.*;
import com.google.common.util.concurrent.*;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.CompositeFilter;
import com.google.appengine.api.datastore.Query.CompositeFilterOperator;
import com.google.appengine.api.datastore.Query.Filter;
import com.google.appengine.api.datastore.Query.FilterOperator;
import com.google.appengine.api.datastore.Query.FilterPredicate;
import com.google.appengine.api.datastore.Query.SortDirection;
import com.google.appengine.api.datastore.*;
import java.util.concurrent.TimeUnit;
 import com.google.appengine.api.datastore.FetchOptions;
import java.util.stream.Collectors;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    List<String> comments = new ArrayList<>();
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	/**
    *   this doGet() function will write out the List of comments to JSON
    *   format is an array of hash with with strings of info.
    *   request: the incoming user request, (should be empty)
    *   response: the response that we will send, usually the array of comments
    **/
    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;");
        Gson gson = new Gson();

        Query query = new Query("comments");
        PreparedQuery results = datastore.prepare(query);
        ArrayList<HashMap<String, String>> output = new  ArrayList<HashMap<String, String>>();
        for (Entity entity : results.asList(FetchOptions.Builder.withLimit(Integer.parseInt(request.getParameter("amount"))))) {
            HashMap<String, String> newEntity = new HashMap<String, String>();
            newEntity.put("name", (String) entity.getProperty("name"));
            newEntity.put("comment", (String) entity.getProperty("comment"));
            newEntity.put("id", String.valueOf(entity.getKey().getId()));
            output.add(newEntity);
        }

        response.getWriter().println(gson.toJson(output));
    }


	/**
    *   this doPost() function will write the comments to the Datastore instance.
    *   It reads in a name and comment from a query param to write to datastore
    *   It has a similar rate limiter to the do get, if it sees more than 10 req /sec,
    *   it'll pause and wait till the Rate Limit resets
    *   request: the incoming user request, (should be empty as we use query params)
    *   response: the response that we will send, normally nothing gets returned, only a 200 or 500
    **/
	@Override
  	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;");

        Entity taskEntity = new Entity("comments");
        taskEntity.setProperty("name", getPostName(request));
        taskEntity.setProperty("comment", getPostComment(request));

        datastore.put(taskEntity);
    }

	/**
    *   getPostComment() is a helper function used to get the comment parameter of the body
    *   request: the incoming http request to parse it from.
    **/
    private String getPostComment(HttpServletRequest request) {
        return request.getParameter("comment");
    }

	/**
    *   getPostName() is a helper function used to get the author parameter of the body
    *   request: the incoming http request to parse it from.
    **/
    private String getPostName(HttpServletRequest request) {
        return request.getParameter("name");
    }
}