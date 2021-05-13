FROM node:14-alpine

RUN apk update && apk upgrade && \
    apk add --no-cache bash git openssh

CMD tail -f /dev/null