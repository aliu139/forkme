#!/usr/bin/python
import sys
import nltk
import json
import os
if (len(sys.argv) > 1):
    print("tagging " + sys.argv[1])
else:
    print("please run with arg")
    exit()

input = open(sys.argv[1], 'r')
filetext = nltk.word_tokenize(input.read())
newArr = nltk.pos_tag(filetext)

if (os.path.isfile('dictionaries/probability.data')):
    prob_raw = open('dictionaries/probability.data', 'r')
    prob_raw_data = prob_raw.read()
    prob_ret_arr = json.loads(prob_raw_data)
else:
    prob_ret_arr = {}

word_ret_arr = {}

prev_key = newArr.pop(0)[1]
prob_ret_arr[prev_key] = {}
word_ret_arr[prev_key] = []
for item in newArr:
    curr_key = item[1]
    word = item[0]
    if curr_key not in prob_ret_arr:
        prob_ret_arr[curr_key] = {}
    if curr_key not in word_ret_arr:
        word_ret_arr[curr_key] = []
    if curr_key not in prob_ret_arr[prev_key]:
        prob_ret_arr[prev_key][curr_key] = 0
    prob_ret_arr[prev_key][curr_key] +=1
    if (word not in word_ret_arr[curr_key]):
        word_ret_arr[curr_key].append(word)

# print dictionaries
for dict in word_ret_arr.keys():
    if len(dict)>1:
        curr_dict = open('dictionaries/' + dict + '.txt', 'a')
        for word in word_ret_arr[dict]:
            curr_dict.write(word + '\n')
# save probabilities
prob_output = json.dumps(prob_ret_arr)
out_prob = open('dictionaries/probability.data', 'w')
out_prob.write(prob_output)
