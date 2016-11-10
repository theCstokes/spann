@echo off
echo Runninng...
call grunt
call lessc --glob ui-framework/theme/main.less theme/main.css
echo Done
