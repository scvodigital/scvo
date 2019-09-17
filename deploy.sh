#!/usr/bin/env bash

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")
BRANCH=$(git rev-parse --abbrev-ref HEAD)

if [ "$BRANCH" != "development" ]; then
  echo "CANNOT DEPLOY: You can only deploy from the 'development' branch"
elif [[ `git status --porcelain` ]]; then
  echo "CANNOT DEPLOY: There are local changes"
elif [ $LOCAL = $REMOTE ]; then
  echo "DEPLOYING"

  travis encrypt-file secret.json --add --force
  git add secret.json.enc .travis.yml
  git commit -m "Updated secret.json"
  npm version patch
  git push
  git checkout production
  git pull
  git pull origin development
  git push
  git checkout development
  echo "Giving Travis a chance to start"
  sleep 20
  travis logs
elif [ $LOCAL = $BASE ]; then
  echo "CANNOT DEPLOY: Need to pull"
elif [ $REMOTE = $BASE ]; then
  echo "CANNOT DEPLOY: Need to push"
else
  echo "CANNOT DEPLOY: Diverged"
fi