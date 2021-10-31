#!/bin/zsh
echo '{"account":"0x123","filename": "MODIFY_HERE", "password": "updatelatertoseed"}' | gzip | curl -vvv -i --data-binary @- -H "Content-Encoding: gzip" http://localhost:3500/v1/protech/ 