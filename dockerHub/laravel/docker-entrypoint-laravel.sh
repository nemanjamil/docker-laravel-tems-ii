#!/bin/bash


echo "DOCKER ENTRY POINT"
mkdir /var/www/be

chown -R www-data: /var/www/be

ls -lsa