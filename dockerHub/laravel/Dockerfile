FROM ubuntu

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    build-essential \
    mariadb-client \
    locales \
    zip \
    jpegoptim optipng pngquant gifsicle \
    vim \
    unzip \
    git \
    curl \
    dos2unix

RUN apt-get clean && rm -rf /var/lib/apt/lists/*

# Add user for laravel application
# RUN groupadd -g 1000 www
# RUN useradd -u 1000 -ms /bin/bash -g www www

RUN ls -lsa

EXPOSE 9000
CMD ["bash"]
