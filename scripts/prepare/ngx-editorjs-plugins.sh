#!/usr/bin/env bash

# TODO: Make this script generic based on project

set -o errexit -o noclobber -o nounset -o pipefail

ng build ngx-editorjs-plugins
cp libs/ngx-editorjs-plugins/CHANGELOG.md dist/libs/ngx-editorjs-plugins
cp libs/ngx-editorjs-plugins/.npmignore dist/libs/ngx-editorjs-plugins

cd dist/libs/ngx-editorjs-plugins

npm publish --access public --dry-run
