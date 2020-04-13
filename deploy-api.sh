#!/bin/sh
export API_PATH=.deploy/api
export GIT_HEROKU_URL="https://$HEROKU_USERNAME:$HEROKU_API_KEY@git.heroku.com/personal-stalker-api.git"

rm -frv $API_PATH
git clone $GIT_HEROKU_URL $API_PATH
rm -frv $API_PATH/*

docker-compose -f ci.docker-compose.yml exec api /bin/sh -c 'yarn build'
cp -frv api/build/* $API_PATH
sed -i "s/BUILD_NUMBER/$TRAVIS_BUILD_NUMBER/g" $API_PATH/package.json

cd $API_PATH
git config user.name "$GITHUB_USERNAME"
git config user.email "$GITHUB_USERMAIL"
git add --all
git commit -m "Build $TRAVIS_BUILD_NUMBER"
git remote set-url origin $GIT_HEROKU_URL
git push origin master
