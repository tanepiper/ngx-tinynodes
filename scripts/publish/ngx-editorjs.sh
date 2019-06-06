#!/usr/bin/env bash

# TODO: Make this script generic based on project

set -o errexit -o noclobber -o nounset -o pipefail

if [[ ! -f "dist/libs/ngx-editorjs/CHANGELOG.md" ]]; then
  echo "CHANGELOG not copied, run the prepare script first"
  exit 1;
fi

if [[ ! -f "dist/libs/ngx-editorjs/.npmignore" ]]; then
  echo ".npmignore not copied, run the prepare script first"
  exit 1;
fi

cd dist/libs/ngx-editorjs

npm publish --access public
