#!/bin/sh

(cd client; yarn; yarn fe-watch) & (cd server; dotnet watch run Project.csproj)