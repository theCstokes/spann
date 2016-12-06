#!/bin/bash
PATH=$PATH:`npm bin`

echo Runninng...
grunt
cd framework
sh UiBuild.sh
echo Done
