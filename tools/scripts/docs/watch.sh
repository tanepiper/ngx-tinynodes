
#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

# TODO: Make this script generic based on project

if ! [ -x "$(command -v compodoc)" ]; then
  echo 'Error: compodoc is not installed.' >&2
  exit 1
fi

compodoc -c .compodocrc.json -w -s
