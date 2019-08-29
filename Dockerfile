FROM php:7.2-fpm

# Copy composer.lock and composer.json
COPY ./laravelData/composer.lock ./laravelData/composer.json /var/www/

# Set working directory
WORKDIR /var/www

# Install dependencies
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

# Clear cache
RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Install extensions
RUN docker-php-ext-install pdo_mysql mbstring zip exif pcntl
RUN docker-php-ext-configure gd --with-gd --with-freetype-dir=/usr/include/ --with-jpeg-dir=/usr/include/ --with-png-dir=/usr/include/
RUN docker-php-ext-install gd

# Install composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Add user for laravel application
RUN groupadd -g 1000 www
RUN useradd -u 1000 -ms /bin/bash -g www www

# Copy existing application directory contents
COPY ./laravelData/ /var/www

# Copy existing application directory permissions
# COPY --chown=www:www . /var/www

# RUN php artisan key:generate
# RUN php artisan config:clear
# RUN php artisan make:controller MyController
# RUN php artisan migrate
# RUN chown -R www-data:www-data /var/www/storage /var/www/bootstrap/cache

COPY ./dockerHub/run.sh /var/www/
RUN dos2unix /var/www/run.sh
RUN /var/www/run.sh

# Change current user to www
USER www

# Expose port 9000 and start php-fpm server
EXPOSE 9000
CMD ["php-fpm"]