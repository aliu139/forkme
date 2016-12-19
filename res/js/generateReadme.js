// Increases in probability of a sentence/the readme
// ending with each additional word
var DELTA_WORD_SENTENCE = 0.017;
var DELTA_SENTENCE_README = 0.0016;

function normalize(arr) {
    var sum = arr.reduce((a, b) => a + b, 0);
    return arr.map(val => val / sum);
}

// Probabilities
// Format is [noun, verb, adj, adv, interj, city, dem, art]
// PROBABILITIES.x is the array xProb
var PROB_KEYS = ["noun", "verb", "adj", "adv", "interj", "city", "dem", "art"];

// function getNextWord(prev) returns a new word based on prev
// prev is a string from PROB_KEYS
function getNextPart(prev) {
    var prevIdx = PROB_KEYS.indexOf(prev);
    var rand = Math.random();
    var curr = PROBABILITIES[prev];
    for (let i = 0; i < curr.length; i++) {
        if (rand < curr[i]) {
            return PROB_KEYS[i];
        }
    }
    return PROB_KEYS[0];
}

function getWord(partOfSpeech) {
    var dict = DICTIONARY[partOfSpeech];
    var randIdx = Math.floor(Math.random() * dict.length);
    return dict[randIdx];
}

function generateTitle() {
    var noun = getWord("noun");
    var noun2 = getWord("noun");
    return noun[0].toUpperCase() + noun.substr(1, 3) + noun2[0].toUpperCase() + noun2.substr(1, noun2.length);
}

function generateReadme() {
    // Counts up how many words are in a
    // sentence and how many in a word.  
    // Sentence counter resets at end of each sentence.
    var docWordCounter = 0;
    var sentenceWordCounter = 0;
    var currDocEndProb = 0;
    var currSentenceEndProb = 0;
    var isNewSentence = true;

    var randDocKey = Math.random();
    var randSentenceKey = Math.random();

    var README = "";
    var prevPartOfSpeech = PROB_KEYS[0];

    // Loop to generate readme
    while (randDocKey > currDocEndProb) {
        var currSentence = getWord(prevPartOfSpeech);
        prevPartOfSpeech = getNextPart(prevPartOfSpeech);
        currSentenceEndProb = currSentenceEndProb + DELTA_WORD_SENTENCE;

        randSentenceKey = Math.random();
        // Loop to generate sentence
        while (randSentenceKey > currSentenceEndProb) {
            currSentence = currSentence + ' ' + getWord(prevPartOfSpeech);
            prevPartOfSpeech = getNextPart(prevPartOfSpeech);
            currSentenceEndProb += DELTA_WORD_SENTENCE;
            sentenceWordCounter += 1;
            randSentenceKey = Math.random();
        }
        if (isNewSentence){
            currSentence = currSentence[0].toUpperCase() + currSentence.substr(1, currSentence.length);
        }
        if (sentenceWordCounter < 4 && Math.random() < 0.4){
            // With probability 0.4, make a short sentence into a clause
            currSentence = currSentence + ', ';
            isNewSentence = false;
        } else {
            currSentence = currSentence + '. ';
            isNewSentence = true;
        }
        README = README + currSentence;
        sentenceWordCounter = 0;
        currDocEndProb = currDocEndProb + DELTA_SENTENCE_README;
        randDocKey = Math.random();
    }

    return README;

}
