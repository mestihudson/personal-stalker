#!/bin/sh +x
export UI_PATH=.deploy/ui
export GITHUB_URL="https://$GITHUB_USERNAME:$GITHUB_TOKEN@github.com/personal-stalker/personal-stalker.github.io"

rm -frv $UI_PATH
git clone $GITHUB_URL $UI_PATH
rm -frv $UI_PATH/*

docker-compose -f ci.docker-compose.yml exec ui /bin/sh -c 'yarn build'
cp -frv ui/build/* $UI_PATH
sed -i "s/BUILD_NUMBER/$TRAVIS_BUILD_NUMBER/g" $UI_PATH/index.html

cd $UI_PATH
git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_USERMAIL"
git add --all
git commit -m "Build $TRAVIS_BUILD_NUMBER"
git remote set-url origin $GITHUB_URL
git push origin master
