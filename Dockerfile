
FROM node:16 as build

WORKDIR /app/flutter-product
COPY package.json .
RUN yarn install
COPY . .
RUN yarn build

FROM node:16-alpine as runtime
WORKDIR /app/flutter-product
COPY --from=build /app/flutter-product ./
# COPY --from=build /app/flutter-product/dist ./dist
# COPY --from=build /app/flutter-product/node_modules ./node_modules
# COPY --from=build /app/flutter-product/app ./
# COPY --from=build /app/flutter-product/app ./

EXPOSE 4000

HEALTHCHECK --interval=10s --timeout=5s \
    CMD mysql -h mysql -u root -ppassword -e 'SELECT 1' || exit 1
