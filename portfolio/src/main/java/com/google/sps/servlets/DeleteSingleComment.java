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
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Key;
import com.google.appengine.api.datastore.*;
import java.util.concurrent.TimeUnit;
import com.google.appengine.api.datastore.FetchOptions;
import java.util.stream.Collectors;

@WebServlet("/deleteSingleComment")
public class DeleteSingleComment extends HttpServlet {

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();

	@Override
  	public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        response.setContentType("application/json;");
		String id = request.getParameter("id");

        Key key = KeyFactory.createKey("comments", Long.parseLong(id));
        datastore.delete(key);
    }
}