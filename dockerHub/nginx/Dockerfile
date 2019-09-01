ARG ARG_LATEST
FROM nginx:$ARG_LATEST

RUN mv /etc/nginx/conf.d/default.conf /etc/nginx/conf.d/default-conf.old
CMD ["nginx", "-g", "daemon off;"]
