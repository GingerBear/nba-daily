#!/bin/bash

cd /root/projects/nba-daily/
git checkout offline-version
git pull origin offline-version
nodejs scripts/fetch-all.js