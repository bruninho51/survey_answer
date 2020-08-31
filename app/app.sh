#!/bin/sh

npm install

if [ "$NODE_ENV" == "development" ];
then
    echo "Run application in development mode"
    npm run dev
else
    echo "Run application in production mode"
    npm start
fi