FROM node:21-slim as development

WORKDIR /usr/code

COPY . .

RUN rm -rf node_modules
RUN rm -f package-lock.json
RUN npm cache clean --force

RUN npm install --force