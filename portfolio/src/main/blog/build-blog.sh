#!/bin/bash

echo " --- BUILDING JEKYLL BLOG ---"
sudo docker run --rm -it --volume="$PWD:/srv/jekyll" --volume="$PWD/vendor/bundle:/usr/local/bundle" --env JEKYLL_ENV=production jekyll/jekyll:3.8 jekyll build
echo "--- FINISHED BUILDING, CLEANING BUILD LIBRARIES ---"
sudo rm -rf vendor/
rm -rf ../webapp/blog
mv _site ../webapp/blog