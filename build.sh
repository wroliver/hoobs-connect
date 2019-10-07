#!/bin/bash

rm -f ./builds/wifi-connect-hoobs.tar.gz
cp -R ./ui ./builds/
cd ./builds/
tar -cvzf ui.tar.gz ./ui/*
mkdir ./wifi-connect-hoobs
mv ./ui ./wifi-connect-hoobs/
mv ./ui.tar.gz ./wifi-connect-hoobs/
tar -cvzf wifi-connect-hoobs.tar.gz ./wifi-connect-hoobs/*
rm -fR ./wifi-connect-hoobs
cd ../
