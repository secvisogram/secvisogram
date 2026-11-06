# 1. Builder image
FROM node:24-alpine@sha256:a34ab6d7f6f4813f4d0c5469d74685604b962fbdbf5793a7bc7b4998ecb867c8 AS compile-image

 # install git
RUN apk update; \
    apk add --no-cache git;

## and get github data for GitRevisionPlugin
COPY .git /work/app/.git


# Set the working directory.
WORKDIR /work/app
# copy directories need for build
COPY app /work/app
COPY docs /work/docs

# Install the dependencies and build
RUN npm ci && \
    npm install -D mocha && \
    npm run build

# start secvisogram in docker
FROM nginx:alpine@sha256:b2f80f8f88146b0772fdcc7d92cea621aa8c2889fa8d07ed61d4884fcea53e09
# configure access to csaf-validator-service on localhost
COPY --from=compile-image  /work/app/dist /usr/share/nginx/html
