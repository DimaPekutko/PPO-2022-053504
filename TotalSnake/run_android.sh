#!/usr/bin/env bash


cd game && npm run build && cd ..
cp -r game/build app/src/main/assets/web/
./gradlew installDebug
