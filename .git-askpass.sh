#!/usr/bin/env bash
if [ "$1" = "Username for 'https://github.com':" ] || echo "$1" | grep -qi username; then
  echo "x-access-token"
  exit 0
fi
if echo "$1" | grep -qi password; then
  cat /home/user/workspace/upload/pat.txt
  exit 0
fi
cat /home/user/workspace/upload/pat.txt
