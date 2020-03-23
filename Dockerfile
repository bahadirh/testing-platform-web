FROM socialengine/nginx-spa

RUN pwd
RUN ls

RUN yarn
RUN yarn generate

COPY dist/ /app
RUN chmod 777 -R /app
