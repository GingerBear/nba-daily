#!/bin/bash

cd /root/projects/nba-daily/
git checkout master
git pull origin master
nodejs scripts/fetch-all.js
nodejs scripts/fetch-weather.js