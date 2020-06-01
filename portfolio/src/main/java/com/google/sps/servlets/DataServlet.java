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
import com.google.appengine.api.datastore.KeyFactory;
import java.util.concurrent.TimeUnit;

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
    final String urlRedirect = "https://8080-dot-12380874-dot-devshell.appspot.com/";
    List<String> comments = new ArrayList<>();
    final RateLimiter commentGetLimiter = RateLimiter.create(100.0); 
    final RateLimiter commentPostLimiter = RateLimiter.create(10.0); 
    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

    @Override
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    	response.setContentType("application/json;");
        Gson gson = new Gson();
        commentGetLimiter.acquire();
        response.getWriter().println(gson.toJson(comments));
    }

	@Override
  	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;");
        commentPostLimiter.acquire();
        comments.add(getPostComment(request));
    }

    private String getPostComment(HttpServletRequest request) {
        return request.getParameter("comment");
    }
}