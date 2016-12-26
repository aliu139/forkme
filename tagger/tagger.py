#!/usr/bin/python3
import sys
import nltk
import json
import os
import tagger_settings

TAGGER_IGNORE = tagger_settings.TAGGER_IGNORE
TAGGER_TYPE_IGNORE = tagger_settings.TAGGER_TYPE_IGNORE

# Main method for generating tags.  Takes in raw data, and outputs data to the 
# folder specified by foldername.  If any data exists in the folder, it will
# begin with the existing data and add to it.
def generate_tags(filetextraw, foldername):

    filetext = nltk.word_tokenize(filetextraw)
    newArr = nltk.pos_tag(filetext)
    
    # Check for existing data
    if (os.path.isfile(foldername + '/probability.data')):
        prob_raw = open(foldername + '/probability.data', 'r')
        prob_raw_data = prob_raw.read()
        prob_ret_arr = json.loads(prob_raw_data)
    else:
        prob_ret_arr = {}
    
    # Initialization of the return dict, which prevents duplicate
    # data from the current file
    word_ret_arr = {}
    
    # Initialize the previous key for the Markov chain as the
    # first item from the NLTK tagged data
    prev_key = newArr.pop(0)[1]
    for item in newArr:
        if (item[1] in TAGGER_TYPE_IGNORE):
            continue
        curr_key = item[1]
        try:
            word = item[0]
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
        curr_arr = []
        if (os.path.isfile(foldername + '/' + dict + '.txt')):
            existing_dict = open(foldername + '/' + dict + '.txt', 'r')
            curr_arr = existing_dict.readlines()
            curr_arr = list(map(lambda a: a.strip('\n'), curr_arr))
    
        for word in word_ret_arr[dict]:
            word = word.lower()
            if (word not in curr_arr) and not (word[0] in TAGGER_IGNORE):
                curr_arr.append(word)
    
        curr_dict = open(foldername + '/' + dict + '.txt', 'w')
        for word in curr_arr:
            curr_dict.write((word + '\n'))

    # save probabilities
    prob_output = json.dumps(prob_ret_arr)
    out_prob = open(foldername + '/probability.data', 'w')
    out_prob.write(prob_output)
