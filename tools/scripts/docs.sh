
#!/usr/bin/env bash
set -o errexit -o noclobber -o nounset -o pipefail

# TODO: Make this script generic based on project

if ! [ -x "$(command -v git)" ]; then
  echo 'Error: git is not installed.' >&2
  exit 1
fi
