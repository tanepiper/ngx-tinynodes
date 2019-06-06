#!/usr/bin/env bash

# TODO: Make this script generic based on project

set -o errexit -o noclobber -o nounset -o pipefail

ng build ngx-editorjs
cp libs/ngx-editorjs/CHANGELOG.md dist/libs/ngx-editorjs
cp libs/ngx-editorjs/.npmignore dist/libs/ngx-editorjs

cd dist/libs/ngx-editorjs

npm publish --access public --dry-run
