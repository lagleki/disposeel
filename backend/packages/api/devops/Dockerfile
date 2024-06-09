## Build application
FROM node:20-alpine as builder

RUN apk add --no-cache protoc
RUN apk add --no-cache protobuf-dev

WORKDIR /usr/src/app

COPY backend/package.json backend/package-lock.json ./

RUN npm ci

COPY ./backend .

RUN npx nx build api --prod

RUN npm cache clean --force

## Setup production application 
FROM node:20-alpine

ENV NODE_ENV=production

USER node

WORKDIR /usr/src/app

COPY --chown=node:node --from=builder /usr/src/app/node_modules ./node_modules

COPY --chown=node:node --from=builder /usr/src/app/dist/packages/api ./dist

CMD ["node", "dist/main.js"]