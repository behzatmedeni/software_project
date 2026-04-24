@REM Maven Wrapper script for Windows
@REM This script downloads Maven if needed and runs it

@echo off
setlocal

set "MAVEN_PROJECTBASEDIR=%~dp0"
set "WRAPPER_JAR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper\maven-wrapper.jar"

@REM Find java.exe
if defined JAVA_HOME (
    set "JAVA_EXE=%JAVA_HOME%\bin\java.exe"
) else (
    set "JAVA_EXE=java"
)

@REM Run the wrapper
"%JAVA_EXE%" -jar "%WRAPPER_JAR%" %*

endlocal
