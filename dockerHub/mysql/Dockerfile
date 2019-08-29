FROM mariadb:latest

ADD init_db.sh /root/init_db.sh

RUN apt-get update && apt-get install -y dos2unix

RUN dos2unix /root/init_db.sh && apt-get --purge remove -y dos2unix && rm -rf /var/lib/apt/lists/*

RUN /root/init_db.sh

CMD ["mysqld"]

# EXPOSE 3306
