@echo off
echo Runninng...
call grunt
pushd framework
call UiBuild.bat
popd
echo Done
