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

/** Servlet that returns some example content. TODO: modify this file to handle comments data */
@WebServlet("/data")
public class DataServlet extends HttpServlet {
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
            newEntity.put("name", htmlInjectionPreventer((String) entity.getProperty("name")));
            newEntity.put("comment", htmlInjectionPreventer((String) entity.getProperty("comment")));
            newEntity.put("score", (String) entity.getProperty("score"));
            newEntity.put("id", String.valueOf(entity.getKey().getId()));
            newEntity.put("image", (String) entity.getProperty("image"));
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
                Gson gson = new Gson();
        Document doc = Document.newBuilder()
                .setContent(getPostComment(request))
                .setType(Document.Type.PLAIN_TEXT)
                .build();
        LanguageServiceClient languageService = LanguageServiceClient.create();
        Sentiment sentiment = languageService.analyzeSentiment(doc).getDocumentSentiment();
        float score = sentiment.getScore();
        languageService.close();
        response.getWriter().println(gson.toJson( request.getParameter("image")));        

        Entity taskEntity = new Entity("comments");
        taskEntity.setProperty("name", getPostName(request));
        taskEntity.setProperty("comment", getPostComment(request));
        taskEntity.setProperty("image", getUploadedFileUrl(request, "image"));
        taskEntity.setProperty("score", String.valueOf(score));
        datastore.put(taskEntity);


        // BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
        // Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
        // List<BlobKey> blobKeys = blobs.get("image");


        // // Our form only contains a single file input, so get the first index.
        // BlobKey blobKey = blobKeys.get(0);

        // blobstoreService.serve(blobKey, response);
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

  /** Returns a URL that points to the uploaded file, or null if the user didn't upload a file. */
  private String getUploadedFileUrl(HttpServletRequest request, String formInputElementName) {
    BlobstoreService blobstoreService = BlobstoreServiceFactory.getBlobstoreService();
    Map<String, List<BlobKey>> blobs = blobstoreService.getUploads(request);
    List<BlobKey> blobKeys = blobs.get(formInputElementName);

    // User submitted form without selecting a file, so we can't get a URL. (dev server)
    if (blobKeys == null || blobKeys.isEmpty()) {
      return null;
    }

    // Our form only contains a single file input, so get the first index.
    BlobKey blobKey = blobKeys.get(0);

    // User submitted form without selecting a file, so we can't get a URL. (live server)
    BlobInfo blobInfo = new BlobInfoFactory(datastore).loadBlobInfo(blobKey);
    if (blobInfo.getSize() == 0) {
      blobstoreService.delete(blobKey);
      return null;
    }

    ImagesService imagesService = ImagesServiceFactory.getImagesService();
    ServingUrlOptions options = ServingUrlOptions.Builder.withGoogleStorageFileName(blobInfo.getGsObjectName());
    return imagesService.getServingUrl(options);
  }
}