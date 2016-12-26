# Tagger
Small library written in NLTK + Python.  Collects data from written work into a Markov matrix and a set of dictionaries, and is able to reproduce randomly generated text using probabilities recorded from a given dataset.

## Setup
To use, you must have Python 3.x + NLTK - previous version of Python will experience issues with Unicode string handling.  To install NLTK, I recommend using pip3 - run the following:
```
sudo pip3 install nltk
```
Then, simply use the run script to run the program.

## Use
Place data files to be tagged into the training folder.  Run `run.sh` to tag the data and put the results into the dictionaries folder.  The default settings should be good enough for most purposes - the defaults clean most data and keep primarily only actual words.  To customize the type of data recorded, modify the arrays in `tagger_settings.py`.

## Generation
Coming soon!
