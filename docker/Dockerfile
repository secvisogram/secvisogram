ARG BUILD_IMAGE=node:22-alpine
ARG BASE_IMAGE=nginx:1.29-alpine

# Build Stage 1
# This build created a staging docker image
#
FROM ${BUILD_IMAGE} AS build
ARG VERSION=main
ARG REPO_URL=https://github.com/secvisogram/secvisogram.git
WORKDIR /usr/src

# do not clone but use local context for building docker images
# that ensures that local builds are possible as well as builds
# from forked branches without changing the dockerfile
COPY . ./

RUN apk add --no-cache git
RUN npm ci; \
    npm run build

# Build Stage 2
# This build takes the production build from staging build
#

FROM ${BASE_IMAGE} AS webserver
ARG MAINTAINER
ARG REPO_URL=https://github.com/secvisogram/secvisogram.git
LABEL org.opencontainers.image.authors="${MAINTAINER}"
LABEL org.opencontainers.image.source="${REPO_URL}"
COPY --from=build /usr/src/app/dist /usr/share/nginx/html
EXPOSE 80
USER nginx
