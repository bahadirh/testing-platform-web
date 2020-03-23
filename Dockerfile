
FROM node:alpine AS base

COPY . .

RUN yarn
RUN yarn generate


FROM socialengine/nginx-spa

COPY --from=base dist /app
RUN chmod 777 -R /app
