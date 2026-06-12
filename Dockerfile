FROM node:alpine as nodework
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build

FROM nginx
RUN rm -rf /usr/share/nginx/html/*.html

COPY --from=nodework /app/build /usr/share/nginx/html
COPY app.conf /etc/nginx/conf.d/app.conf


CMD ["nginx", "-g", "daemon off;"]


# manual test purpose
#FROM nginx
#RUN rm -rf /usr/share/nginx/html/index.html

#COPY /build /usr/share/nginx/html
#COPY  app.conf /etc/nginx/conf.d/app.conf


#CMD ["nginx", "-g", "daemon off;"]

