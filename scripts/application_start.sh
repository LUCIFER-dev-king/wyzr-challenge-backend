#!/bin/bash

cd /server/deploy

npm install

node app.js > app.out.log > app.err.log < /dev/null &
