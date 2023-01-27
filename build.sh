#!/bin/bash

cd frontend;

echo "building...";
yarn build;

cd ..;

echo "cleaning...";
rm -r ./backend/public/*;

echo "moving...";
mv ./frontend/dist/* ./backend/public/;

echo "end";
