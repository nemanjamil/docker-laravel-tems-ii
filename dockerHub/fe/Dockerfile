FROM php:7.2-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    mariadb-client \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    dos2unix

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# COPY ../../fe/ /var/www/fe

RUN ls -lsa

EXPOSE 9001

CMD ["php-fpm"]