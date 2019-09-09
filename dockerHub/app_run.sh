#!/bin/bash

echo "ARTISAN KEY AND CONFIG"
pwd
cd /var/www/be
php artisan key:generate
php artisan config:clear
php artisan storage:link