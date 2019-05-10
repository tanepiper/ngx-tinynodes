#!/usr/bin/env bash

# TODO: Make this script generic based on project

set -o errexit -o noclobber -o nounset -o pipefail

echo "Building Distribution"
npm run build ngx-editorjs

echo "Build Docs"
compodoc -p libs/ngx-editorjs/tsconfig.lib.json -d libs/ngx-editorjs/docs

echo "Copy Changelog"
cp libs/ngx-editorjs/CHANGELOG.md dist/libs/ngx-editorjs/CHANGELOG.md

echo "Copy Docs"
cp -r libs/ngx-editorjs/docs dist/libs/ngx-editorjs/docs
