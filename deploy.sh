#!/usr/bin/env bash

UPSTREAM=${1:-'@{u}'}
LOCAL=$(git rev-parse @)
REMOTE=$(git rev-parse "$UPSTREAM")
BASE=$(git merge-base @ "$UPSTREAM")

if [ $(git rev-parse --abbrev-ref HEAD) != \"development\" ]; then
  echo "Cannot deploy: You can only deploy from the 'development' branch"
elif [ $LOCAL = $REMOTE ]; then
  echo "DEPLOYING"

  # travis encrypt-file secret.json --add --force
  # git add secret.json.enc .travis.yml
  # git commit -m "Updated secret.json"
  # npm version patch
  # git push
  # git checkout production
  # git pull
  # git pull origin development
  # git push
  # git checkout development
elif [ $LOCAL = $BASE ]; then
  echo "Cannot deploy: Need to pull"
elif [ $REMOTE = $BASE ]; then
  echo "Cannot deploy: Need to push"
elif [[ `git status --porcelain` ]]; then
  echo "Cannot deploy: There are local changes"
else
  echo "Cannot deploy: Diverged"
fi