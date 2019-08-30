FROM php:7.2-fpm

RUN apt-get clean
RUN apt-get update

#install some basic tools
RUN apt-get install -y \
        git \
        tree \
        vim \
        wget \
        subversion

#install some base extensions
RUN apt-get install -y \
        zlib1g-dev \
        zip \
  && docker-php-ext-install zip

RUN curl -sS https://getcomposer.org/installer | php && mv composer.phar /usr/local/bin/composer


# WORKDIR /var/www
# RUN composer install

# USER www-data


# COPY ./dockerHub/app_bash.sh /root/
# RUN /root/app_bash.sh

# EXPOSE 9000

# ENTRYPOINT ["/bin/echo", "Hello world"]
# ENTRYPOINT composer install
CMD ["php-fpm"]