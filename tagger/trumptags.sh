#!/bin/bash
rm trump/*
for file in trump_training/*
do
    ./tagger.py $file trump
done
