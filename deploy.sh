#!/bin/bash

npm run build
git clone https://GingerBear:34d545d96b273a545f23e0389fc60d84c6b1e83b@github.com/GingerBear/gingerbear.github.io.git
rm -rf gingerbear.github.io/nba
cp -R build gingerbear.github.io/nba
cd gingerbear.github.io
git add .
git commit -am "update nba-daily"
git push origin master
cd ..
rm -rf gingerbear.github.io