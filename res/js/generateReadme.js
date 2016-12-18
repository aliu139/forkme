//// Array from file function
//var arrayFromFile = function(file){
//    var arr = [];
//    var txt = '';
//    var xmlhttp = new XMLHttpRequest();
//    xmlhttp.onreadystatechange = function(){
//        if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
//            txt = xmlhttp.responseText;
//        }
//    };
//    xmlhttp.open("GET","https://raw.githubusercontent.com/aliu139/forkme/master/temp.txt",true);
//    xmlhttp.send();
//
//    console.log(txt);
//    arr = txt.split('\n');
//    return arr;
//};


// Increases in probability of a sentence/the readme
// ending with each additional word
var DELTA_WORD_SENTENCE = 0.0026;
var DELTA_SENTENCE_README = 0.0016;

// Helper function to normalize probability array for 
// random generation.  Takes in array with probabilities
// like [1,4,2] and normalizes it between 0 and 1,
// summing from left to right the ending array would be [1/7, 5/7, 7/7]
function normalize(arr){
    var sum = 0;
    for (let value of arr){
        sum = sum + value;
    }
    var prevSum = 0;
    for (let i = 0; i < arr.length; i++){
        prevSum = prevSum + arr[i];
        arr[i] = prevSum/sum;
    }
    return arr;
}

// Dictionaries
var NOUN_DICT = ["system", "program", "install", "dependencies", "resources", "storage", "deployment", "download", "uplink", "connection"];
var VERB_DICT = ["download", "upload", "install", "reinstall", "run", "upgrade", "relink", "clone", "commit", "patch"];
var ADJ_DICT = ["large", "tremendous"];
var ADV_DICT = ["quickly", "tremendously", "rapidly", "intuitively"];
var INTERJ_DICT = ["agile", "scrum"];
var CITY_DICT = ["Santa Clara", "San Francisco"];
var DEM_DICT = ["those", "that", "this", "these"];
var ART_DICT = ["a", "the"];

var DICTIONARY = {
    noun: NOUN_DICT,
    verb: VERB_DICT,
    adj: ADJ_DICT,
    adv: ADV_DICT,
    interj: INTERJ_DICT,
    city: CITY_DICT,
    dem: DEM_DICT,
    art: ART_DICT
}

// Probabilities
// Format is [noun, verb, adj, adv, interj, city, dem, art]
// PROBABILITIES.x is the array xProb
var PROB_KEYS = ["noun", "verb", "adj", "adv", "interj", "city", "dem", "art"];
var nounProb = [0, 3, 2, 1, 4, 1, 0, 0];
var verbProb = [0, 0, 0, 5, 3, 2, 3, 1];
var adjProb = [7, 3, 2, 1, 4, 3, 2, 6];
var advProb = [3,3,3,3,3,3,3,3];
var interjProb = [3,3,3,3,3,3,3,3];
var cityProb = [3,3,3,3,3,3,3,3];
var demProb = [3,3,3,3,3,3,3,3];
var artProb = [3,3,3,3,3,3,3,3];

var PROBABILITIES = {
    noun: normalize(nounProb),
    verb: normalize(verbProb),
    adj: normalize(adjProb),
    adv: normalize(advProb),
    interj: normalize(interjProb),
    city: normalize(cityProb),
    dem: normalize(demProb),
    art: normalize(artProb)
}

// function getNextWord(prev) returns a new word based on prev
// prev is a string from PROB_KEYS
function getNextPart(prev){
    var prevIdx = PROB_KEYS.indexOf(prev);
    var rand = Math.random();
    var curr = PROBABILITIES[prev];
     for (let i = 0; i < curr.length; i++){
        if (rand < curr[i]){
            return PROB_KEYS[i];
        }
    }
}

function getWord(partOfSpeech){
    var dict = DICTIONARY[partOfSpeech];
    var randIdx = Math.floor(Math.random() * dict.length);
    return dict[randIdx];
}


function generateTitle(){
    var noun = getWord("noun");
    var adj = getWord("adj");
    var noun2 = getWord("noun");
    return noun[0].toUpperCase() + noun.substr(1, noun.length) + " " + adj + " " + noun2;
}

function generateReadme(){
    // Counts up how many words are in a
    // sentence and how many in a word.  
    // Sentence counter resets at end of each sentence.
    var docWordCounter = 0;
    var sentenceWordCounter = 0;
    var currDocEndProb = 0;
    var currSentenceEndProb = 0;

    var randDocKey = Math.random();
    var randSentenceKey = Math.random();

    var README = "";
    var prevPartOfSpeech = PROB_KEYS[0];

    // Loop to generate readme
    while (randDocKey > currDocEndProb){

        var currSentence = getWord(prevPartOfSpeech);
        prevPartOfSpeech = getNextPart(prevPartOfSpeech);
        currSentenceEndProb = currSentenceEndProb + DELTA_WORD_SENTENCE;

        randSentenceKey = Math.random();
        // Loop to generate sentence
        while (randSentenceKey > currSentenceEndProb){
            currSentence = currSentence + ' ' + getWord(prevPartOfSpeech);
            prevPartOfSpeech = getNextPart(prevPartOfSpeech);
            currSentenceEndProb = currSentenceEndProb + DELTA_WORD_SENTENCE;
            randSentenceKey = Math.random();
        }
        currSentence = currSentence + '. ';
        currSentence = currSentence[0].toUpperCase() + currSentence.substr(1, currSentence.length);
        README = README + currSentence;
        currDocEndProb = currDocEndProb + DELTA_SENTENCE_README;
        randDocKey = Math.random();

    }

    return README;

}
