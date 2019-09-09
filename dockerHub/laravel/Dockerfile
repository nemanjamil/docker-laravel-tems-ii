FROM ubuntu

RUN apt-get update && apt-get install -y  dos2unix
WORKDIR /var/www



COPY docker-entrypoint-laravel.sh /usr/local/bin/
RUN dos2unix /usr/local/bin/docker-entrypoint-laravel.sh

COPY --chown=www-data:www-data  /var/www/be

#RUN /usr/local/bin/docker-entrypoint-laravel.sh

VOLUME /var/www/be



