ARG BUILD_IMAGE=node:22-alpine
ARG BASE_IMAGE=nginx:1.29-alpine

# Build Stage 1
# This build created a staging docker image
#
FROM ${BUILD_IMAGE} AS build
ARG VERSION=main
WORKDIR /usr/src
RUN apk add git; \
    git clone --branch=${VERSION} https://github.com/secvisogram/secvisogram.git; \
    cd secvisogram; \
    npm ci; \
    npm run build

# Build Stage 2
# This build takes the production build from staging build
#

FROM ${BASE_IMAGE}
COPY --from=build /usr/src/secvisogram/app/dist /usr/share/nginx/html
EXPOSE 80
