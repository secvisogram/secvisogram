#!/bin/bash
export BRANCH=$(git rev-parse --abbrev-ref HEAD)
if git describe --exact-match --tags; then
  export TAG=$(git describe --exact-match --tags)
  echo "Building release version: $TAG"
  docker build --build-arg VERSION=$TAG -t secvisogram:$TAG -f Dockerfile ..
  if [ "$BRANCH" != "main" ]; then
    docker tag secvisogram:$TAG secvisogram:latest
  fi
elif [ "$BRANCH" == "main" ]; then
  echo "Building main branch version"
  docker build --build-arg VERSION=main -t secvisogram:latest -f Dockerfile ..
else
  echo "Building development branch version: $BRANCH"
  docker build --build-arg VERSION=$BRANCH -t secvisogram:$BRANCH -f Dockerfile ..
fi
