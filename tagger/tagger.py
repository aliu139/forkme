#!/usr/bin/python
import sys
import nltk
import json
import os
import taggen

if (len(sys.argv) > 1):
    print("tagging " + sys.argv[1])
    input = open(sys.argv[1], 'r')
    filetextraw = input.read()
    taggen.generate_tags(filetextraw)
else:
    print("please run with arg")
    exit()
