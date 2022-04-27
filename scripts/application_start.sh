#!/bin/bash

cd /home/ec2-user/wyzr/server/deploy

npm install

node app.js > app.out.log > app.err.log < /dev/null &
