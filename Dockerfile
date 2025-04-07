# 1. Builder image
FROM node:18-alpine AS compile-image

 # install git and get bare github data for GitRevisionPlugin
RUN apk update; \
    apk add --no-cache git; \
    git clone --bare --depth=1 https://github.com/secvisogram/secvisogram.git /work/

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
COPY docker/de.bsi.secvisogram.json /usr/share/nginx/html/.well-known/appspecific/de.bsi.secvisogram.json
COPY --from=compile-image  /work/app/dist /usr/share/nginx/html