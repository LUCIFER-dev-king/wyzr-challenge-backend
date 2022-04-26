#!/bin/bash

cd server

npm install

node app.js > app.out.log > app.err.log < /dev/null &
