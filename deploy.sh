#!/usr/bin/env bash

if [[ `git status --porcelain` ]]; then
  echo "Changes"
else
  echo "No changes"
fi

# travis encrypt-file secret.json --add --force
#
# git add secret.json.enc .travis.yml
#
# git commit -m \"Updated secret.json\"
#
# npm version patch
#
# git push
#
# git checkout production
#
# git pull
#
# git pull origin development
#
# git push
#
# git checkout development