#!/bin/bash

# Remove previous dist directory
rm -rf dist/

# Build the code. $@ accepts all the parameters from the input command line and uses it in the maven build command
mvn clean package install "$@" -DskipTests -f ./pom-ee.xml -P selfhost-openblocks

if [ $? -eq 0 ]
then
  echo "mvn Successful"
else
  echo "mvn Failed"
  exit 1
fi
