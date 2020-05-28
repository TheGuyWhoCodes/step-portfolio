#!/bin/bash

## Compiles the blog using docker, moves files to the webapp section
cd blog/
echo " --- BUILDING JEKYLL BLOG ---"
sudo docker run --rm -it --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" --env JEKYLL_ENV=production jekyll/jekyll:3.8 jekyll build
echo "--- FINISHED BUILDING, CLEANING BUILD LIBRARIES ---"
sudo rm -rf vendor/
rm -rf ../webapp/blog
mv _site ../webapp/blog

## Uses maven to compile webpage and serve it to appspot
echo "--- DEPLOYING TO APPSPOT ---"
cd ../
cd ../
cd ../
echo $PWD
mvn package appengine:deploy