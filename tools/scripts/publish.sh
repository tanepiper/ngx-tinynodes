#!/usr/bin/env bash

# TODO: Make this script generic based on project

set -o errexit -o noclobber -o nounset -o pipefail

PACKAGE_VERSION=$(grep -m1 version dist/libs/ngx-editorjs/package.json | sed -E 's/.*"(([0-9]+\.?)+).*/\1/')

# git add .
# git diff-index --quiet HEAD || git commit -m "Commit changes for $PACKAGE_VERSION"

npm version ${VERSION_COMMAND:-patch} -m " ${VERSION_COMMAND:-patch} %s [ci skip]"
npm publish dist/libs/ngx-editorjs --access public --dry-run

# git push --tags
# git push --set-upstream origin
