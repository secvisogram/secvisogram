# 1. Builder image
FROM node:22-alpine AS compile-image

 # install git
RUN apk update; \
    apk add --no-cache git;

## and get github data for GitRevisionPlugin
COPY .git /work/app/.git


# Set the working directory. If it doesn't exists, it'll be created
WORKDIR /work/app
# copy directories need for build
COPY app /work/app
COPY csaf-validator-lib /work/csaf-validator-lib
COPY docs /work/docs

# Install the dependencies and build
RUN npm ci; \
    npm install -D mocha; \
    npm run build

# start secvisogram in docker
FROM nginx:alpine
# configure access to csaf-validator-service on localhost
COPY --from=compile-image  /work/app/dist /usr/share/nginx/html