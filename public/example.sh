#!/bin/bash

TYPE="${1:-tags}"
TAG="${2:-Milan}"
TAGS=@$TAG
NIGHTWATCH_ENV="${3:-chrome}"
NE2_FEATURES="trading-system/features/MG Japan Trading System 1-30.feature"

#pgrep chrome | xargs kill -9
#pkill chrome

SERVER_URL=http://10.0.0.114:8111
BUILD_TYPE=NetsFrontEnd_BuildNe2Release25_Staging
BUILD_ID_REQ=${SERVER_URL}/httpAuth/app/rest/buildTypes/$BUILD_TYPE/builds/status:success/id
BUILD_ID_RESP=$(curl -u "dev:2018-Dev-codeli" --request GET "$BUILD_ID_REQ")
NE2_BUILD_ID=$BUILD_ID_RESP

BUILD_CHANGES_REQ="${SERVER_URL}/httpAuth/app/rest/builds?locator=buildId:${NE2_BUILD_ID}&fields=build(id,buildTypeId,number,changes(change(id,username,vcsRootInstance(id,name,vcs-root),files(file(changeType,file)))))"
BUILD_CHANGES_RESP=$(curl -u "dev:2018-Dev-codeli" --request GET "$BUILD_CHANGES_REQ")
NE2_BUILD_INFO=$BUILD_CHANGES_RESP

case $TYPE in
   'default')
      NE2_APP=trading-system IS_SSL=false HOST_NAME=$NE2_HOST_NAME PORT=$NE2_TS_PORT NE2_TIME_ZONE=${NE2_TIME_ZONE} NE2_BUILD_TYPE=${NE2_BUILD_TYPE} NE2_BUILD_NUMBER=${NE2_BUILD_NUMBER} NE2_BUILD_ID=${NE2_BUILD_ID} NE2_BUILD_INFO=${NE2_BUILD_INFO} NIGHTWATCH_ENV=$NIGHTWATCH_ENV npm run regression
      ;;
   'tags')
      NE2_APP=trading-system IS_SSL=false HOST_NAME=$NE2_HOST_NAME PORT=$NE2_TS_PORT TAGS=$TAGS NE2_TIME_ZONE=${NE2_TIME_ZONE} NE2_BUILD_TYPE=${NE2_BUILD_TYPE} NE2_BUILD_NUMBER=${NE2_BUILD_NUMBER} NE2_BUILD_ID=${NE2_BUILD_ID} NE2_BUILD_INFO=${NE2_BUILD_INFO} NIGHTWATCH_ENV=$NIGHTWATCH_ENV npm run regression:tags
      ;;
  'features')
      NE2_APP=trading-system IS_SSL=false HOST_NAME=$NE2_HOST_NAME PORT=$NE2_TS_PORT NE2_FEATURES=${NE2_FEATURES} NE2_TIME_ZONE=${NE2_TIME_ZONE} NE2_BUILD_TYPE=${NE2_BUILD_TYPE} NE2_BUILD_NUMBER=${NE2_BUILD_NUMBER} NE2_BUILD_ID=${NE2_BUILD_ID} NE2_BUILD_INFO=${NE2_BUILD_INFO} NIGHTWATCH_ENV=$NIGHTWATCH_ENV npm run regression:features
      ;;
esac

exit 0
