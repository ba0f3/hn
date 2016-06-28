#!/bin/sh

ng build -prod

mkdir click/www
cp -r dist/* click/www/
click build --no-validate click
click-review --sdk hntouch_*
