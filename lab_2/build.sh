#!/usr/bin/env bash

npx react-native bundle --platform android --dev false --entry-file index.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/

cd android && ./gradlew clear; ./gradlew assembleRelease

adb uninstall com.lab_2
