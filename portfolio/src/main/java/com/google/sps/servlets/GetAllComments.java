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
import com.google.appengine.api.blobstore.BlobInfo;
import com.google.appengine.api.blobstore.BlobInfoFactory;
import com.google.appengine.api.blobstore.BlobKey;
import com.google.appengine.api.blobstore.BlobstoreService;
import com.google.appengine.api.blobstore.BlobstoreServiceFactory;
import com.google.appengine.api.images.ImagesService;
import com.google.appengine.api.images.ImagesServiceFactory;
import com.google.appengine.api.images.ServingUrlOptions;
import java.io.IOException;
import java.io.PrintWriter;
import java.net.MalformedURLException;
import java.net.URL;
import com.google.gson.Gson;

import java.util.List;
import java.util.Map;
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
import com.google.cloud.language.v1.Document;
import com.google.cloud.language.v1.LanguageServiceClient;
import com.google.cloud.language.v1.Sentiment;
import java.util.stream.Collectors;
import org.json.simple.JSONObject;
import com.google.cloud.bigquery.BigQuery;
import com.google.cloud.bigquery.BigQueryOptions;
import com.google.cloud.bigquery.FieldValueList;
import com.google.cloud.bigquery.Job;
import com.google.cloud.bigquery.JobId;
import com.google.cloud.bigquery.JobInfo;
import com.google.cloud.bigquery.QueryJobConfiguration;
import com.google.cloud.bigquery.*;
import java.util.Map.Entry;
import java.util.UUID;
/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/getNumberofE")
public class GetAllComments extends HttpServlet {

    private DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    private BigQuery bigquery = BigQueryOptions.getDefaultInstance().getService();

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

        TableId tableId = TableId.of("comments", "newcomments");

        QueryJobConfiguration queryConfig =
        QueryJobConfiguration.newBuilder(
            "SELECT "
                + "comment from `comments.newcomments` "
                + "WHERE NOT (comment like '%e%')")
        .setUseLegacySql(false)
        .build();

        JobId jobId = JobId.of(UUID.randomUUID().toString());
        Job queryJob = bigquery.create(JobInfo.newBuilder(queryConfig).setJobId(jobId).build());
        
        JSONObject json = new JSONObject();

        try {
            queryJob = queryJob.waitFor();

            // Check for errors
            if (queryJob == null) {
                throw new RuntimeException("Job no longer exists");
            } else if (queryJob.getStatus().getError() != null) {
                // You can also look at queryJob.getStatus().getExecutionErrors() for all
                // errors, not just the latest one.
                throw new RuntimeException(queryJob.getStatus().getError().toString());
            }

            TableResult result = queryJob.getQueryResults();

            json.put("commentsWithoutE",result.getTotalRows());
        } catch (Exception e) {
            json.put("commentsWithoutE", "N/A");
        }
        response.getWriter().println(gson.toJson(json));
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


    /**
    * htmlInjectionPreventer is used to parse out html special characrers
    * renders out as the same text, without original meaning
    * str: string to check
    * return: returns a defang'd string
    **/
    private String htmlInjectionPreventer(String str) {
        return str.replace("<", "&lt;").replace(">", "&gt;");
    }
}