#!/usr/bin/python
import sys
import nltk
import json
import os

#TAGGER_IGNORE = map(lambda a: a.decode('UTF-8'), ['\'', '-', '^', '&', '>', '`', '*', '<', '['])
TAGGER_IGNORE = ['\'', '-', '^', '&', '>', '`', '*', '<', '[']
TAGGER_TYPE_IGNORE = ['$', '\'', '(', ')', ',', '--', '.', ':', 'SYM', '``', '\'\'']

def generate_tags(filetextraw, foldername):
    filetext = nltk.word_tokenize(filetextraw)
    newArr = nltk.pos_tag(filetext)
    
    if (os.path.isfile(foldername + '/probability.data')):
        prob_raw = open(foldername + '/probability.data', 'r')
        prob_raw_data = prob_raw.read()
        prob_ret_arr = json.loads(prob_raw_data)
    else:
        prob_ret_arr = {}
    
    word_ret_arr = {}
    
    prev_key = newArr.pop(0)[1]
    for item in newArr:
        if (item[1] in TAGGER_TYPE_IGNORE):
            continue
        curr_key = item[1]
        try:
            word = item[0].decode('utf-8')
        except:
            word = item[0]
        if prev_key not in prob_ret_arr:
            prob_ret_arr[prev_key] = {}
        if curr_key not in word_ret_arr:
            word_ret_arr[curr_key] = []
        if curr_key not in prob_ret_arr[prev_key]:
            prob_ret_arr[prev_key][curr_key] = 0
        prob_ret_arr[prev_key][curr_key] +=1
        if (word not in word_ret_arr[curr_key]):
            word_ret_arr[curr_key].append(word)
        prev_key = curr_key
    
    # print dictionaries
    for dict in word_ret_arr.keys():
        if len(dict)>1 and (dict.strip('.').strip(',').strip('\'') != ""): # should find a better way to do this
            curr_arr = []
            if (os.path.isfile(foldername + '/' + dict + '.txt')):
                existing_dict = open(foldername + '/' + dict + '.txt', 'r')
                curr_arr = existing_dict.readlines()
                curr_arr = map(lambda a: a.strip('\n').decode('utf-8'), curr_arr)
    
            for word in word_ret_arr[dict]:
                word = word.lower()
                if (word not in curr_arr) and not (word[0] in TAGGER_IGNORE):
                    curr_arr.append(word)
    
            curr_dict = open(foldername + '/' + dict + '.txt', 'w')
            for word in curr_arr:
                curr_dict.write((word + '\n').encode('utf-8'))
    # save probabilities
    prob_output = json.dumps(prob_ret_arr)
    out_prob = open(foldername + '/probability.data', 'w')
    out_prob.write(prob_output)
