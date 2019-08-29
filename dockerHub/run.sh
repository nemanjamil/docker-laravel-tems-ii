#!/bin/bash
echo "BIN is initiated"
php artisan key:generate
php artisan config:clear
# php artisan migrate --seed
#php artisan serve --host=0.0.0.0 --port=$APP_PORT#!/usr/bin/env bash
