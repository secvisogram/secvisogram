FROM golang:1.26-alpine AS builder

WORKDIR /build

# Install git for go get
RUN apk add --no-cache git

# Clone and build context7-http
RUN git clone https://github.com/lrstanley/context7-http.git . && \
    go build -o context7-http

FROM alpine:latest

WORKDIR /app

# Copy binary from builder
COPY --from=builder /build/context7-http /usr/local/bin/context7-http

# Expose port
EXPOSE 3002

# Set default environment variables
ENV HOST=0.0.0.0
ENV PORT=3002

# Run the context7-http server
# This provides HTTP streamable transport for Context7
CMD ["context7-http", "--bind-addr", "0.0.0.0:3002"]