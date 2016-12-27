# Tagger 
Small library written in NLTK + Python with tremendous potential.  Categorizes data from various sources of written work and a set of dictionaries into a single comprehensive Markov matrix, and is able to reproduce the tone of the input works with randomly generated text (using probabilities generated from a given dataset). Highly modular design allows for simple modification/augmentation. 

## Setup
>> ```Tag you're it!``` -- Galileo

To use, you must have Python 3.x + NLTK - previous version of Python will experience issues with Unicode string handling.  To install NLTK, I recommend using pip3 - run the following:
```
sudo pip3 install nltk
```
Then, simply use the run script to run the program.

## Use
>> ``` Can't put a price on these tags ``` -- Jessie J.

Place data files to be tagged into the training folder.  Run `run.sh` to tag the data and put the results into the dictionaries folder.  The default settings should be good enough for most purposes - the defaults clean most data and keep primarily only actual words.  To customize the type of data recorded, modify the arrays in `tagger_settings.py`.

## Generation
>> ``` Why learn html when this has got your tags covered``` -- Matthew Li 

Coming soon!

## Projects that use Tagger

* [**ForkMe**](https://github.com/aliu139/forkme)

In a perfect world, every repository on GitHub would have a clear README, capable of letting visitors know about the purpose, usages, and history behind a project. However, writing a consise yet comprehensive README is an art that takes time and thought. ForkMe is our attempt at disrupting the current ecosystem of READMEs, by automating the process! Even if you aren't familiar with the newest startup jargon, let our product revolutionize the way that you document your product

