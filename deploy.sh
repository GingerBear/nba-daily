#!/bin/bash

yarn
yarn run build
git clone https://GingerBear:$GITHUB_TOKEN@github.com/GingerBear/gingerbear.github.io.git
rm -rf gingerbear.github.io/nba
cp -R build gingerbear.github.io/nba
cd gingerbear.github.io
git add . -A
git commit -am "update nba-daily"
git push origin master
cd ..
rm -rf gingerbear.github.io