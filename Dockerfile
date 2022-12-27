
FROM node:16 as build

WORKDIR /app/flutter-product
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine as runtime
WORKDIR /app/flutter-product
COPY --from=build /app/flutter-product ./

EXPOSE 4000

