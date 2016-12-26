#!/bin/bash
rm dictionaries/*
for file in training/*
do
    ./main.py $file dictionaries
done
