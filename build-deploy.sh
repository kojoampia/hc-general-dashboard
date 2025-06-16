#!/bin/bash

args=$#

# Set the version for the build and deploy
if [ $args -le 0 ];then
    echo "Using default version:latest"
    version="latest"
  else version=$1;
fi



echo "Synchronising with master on bitbucket"

git pull -r

echo "Building and Deploying to General Health Connect Dashboard version $version"

name=hc-general-dashboard
folder=`pwd`

if [[ "$folder" != *"$name"* ]]; then
  folder=$folder/$name
fi

echo "$folder"
cd $folder


echo "building..."
docker build -t "hc-general-dashboard" .
echo "done."

echo "tagging..."
docker tag hc-general-dashboard docker-registry.jojoaddison.net/hc-general-dashboard:$version
docker image ls | grep 'hc-general-dashboard'
echo "done."

echo "pushing..."
docker push docker-registry.jojoaddison.net/hc-general-dashboard:$version

echo "done."
echo "build and deploy completed."
