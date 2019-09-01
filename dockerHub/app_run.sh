#!/bin/bash

echo "ARTISAN KEY AND CONFIG"
pwd
cd be
php artisan key:generate
php artisan config:clear
