# 1. Builder image
FROM node:24-alpine@sha256:116b800c3754b440ee0aa3ed2f20f5bf3d99a554bfd9adeea09ea8017f6e85f5 AS compile-image

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
FROM nginx:1.31-alpine@sha256:0563c36f94a6d3ec3584161b77859f740f7e20b4853f52c796a864ce6908e8ea
# configure access to csaf-validator-service on localhost
COPY --from=compile-image  /work/app/dist /usr/share/nginx/html
