#!/bin/bash
rm trump/*
for file in trump_training/*
do
    ./main.py $file trump
done
