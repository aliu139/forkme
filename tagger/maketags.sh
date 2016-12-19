#!/bin/bash
rm dictionaries/*
./tagger.py demo.txt
./tagger.py washu_demo1.txt
./tagger.py washu_demo2.txt
./tagger.py washu_demo3.txt
./tagger.py washu_demo4.txt

