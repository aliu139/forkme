#!/bin/bash
rm dictionaries/*
./tagger.py training/demo.txt
./tagger.py training/washu_demo1.txt
./tagger.py training/washu_demo2.txt
./tagger.py training/washu_demo3.txt
./tagger.py training/washu_demo4.txt
./tagger.py training/angularjs.txt
./tagger.py training/reactjs.txt