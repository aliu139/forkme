#!/usr/bin/python
import sys
import nltk
import json
import os
import trumptaggen

if (len(sys.argv) > 1):
    print("trump tagging " + sys.argv[1])
    input = open(sys.argv[1], 'r')
    filetextraw = input.read()
    trumptaggen.generate_tags(filetextraw)
else:
    print("please run with arg")
    exit()
