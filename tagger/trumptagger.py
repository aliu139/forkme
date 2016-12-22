#!/usr/bin/python
import sys
import nltk
import json
import os
import trumptaggen

if (len(sys.argv) > 1):
    print("trump tagging " + sys.argv[1])
    input = open(sys.argv[1], 'r')
    filetextraw = input.read().decode('utf-8')
    trumptaggen.generate_tags(filetextraw)
else:
    print("please run with arg")
    exit()
