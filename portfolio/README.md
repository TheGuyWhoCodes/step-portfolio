
# Chris' Portfolio Site

  

This part of the repository contains the portfolio for Christopher Ariagno. 

The app is built with Jekyll for the blog and a Java servlet to serve the entire site.

The app utilizes docker to build the jekyll blog, if you prefer not to use docker, you can simply use the jekyll commands on a bare machine.

The repository is split into three different parts.

  

## Folders

  

- Blog

	- The blog folder contains a jekyll site. Here you can create blog posts in a markdown format

- Java

	- The java folder contains the servlet that serves our compiled html

- webapp

	- The webapp folder contains any and all files that we want to be displayed to the user. Here, we put our index.html and compiled jekyll blog.

  

## Build and Run

  

To run the application in a test mode, you can run the command:

```bash

$ mvn package appengine:run

```

To build and deploy the entire site, you can go back a directory to use the handy build script I made, to run:
```

$ chmod +x build.sh
$ ./build.sh

```

To build JUST the blog, you can use a separate `build-blog.sh` file within the `/blog`: 
```

$ chmod +x build-blog.sh
$ ./build-blog.sh

```
