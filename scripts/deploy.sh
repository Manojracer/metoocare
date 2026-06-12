#!/bin/bash
 
S3_BUCKET="artifacts-fe"

ARTIFACT_KEY="build_artifacts/"
 
# Replace with your deployment directory

DEPLOYMENT_DIR="/srv/www/"
 
# Create the deployment directory if it doesn't exist

if [ -d "$DEPLOYMENT_DIR" ]; then  

  echo "${DEPLOYMENT_DIR} exists"

else

  echo "Creating ${DEPLOYMENT_DIR} directory"

  mkdir -p "${DEPLOYMENT_DIR}"

fi
 
# Get the latest artifact key from S3

LATEST_ARTIFACT_KEY=$(aws s3 ls "s3://artifacts-fe/build_artifacts/" --recursive | sort | tail -n 1 | awk '{print $4}')
 
mkdir /tmp/artifacts
 
if [ -n "$LATEST_ARTIFACT_KEY" ]; then

  # Download the artifact from S3

$(aws s3 cp "s3://artifacts-fe/${LATEST_ARTIFACT_KEY}" /tmp/artifacts)
 
cd /tmp/artifacts

ls -1t  | head -1 | xargs -I{} mv {} latest_build
 
# Unzip the downloaded artifact in the deployment directory

# unzip -o "/tmp/artifacts/${LATEST_ARTIFACT_KEY}" -d "$DEPLOYMENT_DIR"

unzip -o /tmp/artifacts/latest_build -d /srv/www
 
# Check if the unzip was successful

if [ $? -eq 0 ]; then

  echo "Artifact successfully unzipped to ${DEPLOYMENT_DIR}"

else

  echo "Failed to unzip artifact"

fi
 
# Clean up the downloaded artifact from /tmp

sudo rm -rf "/tmp/${ARTIFACT_FILENAME}"
 
else

  echo "No artifacts found in S3 Bucket"

fi
