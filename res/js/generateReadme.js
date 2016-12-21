// Increases in probability of a sentence/the readme
// ending with each additional word
var DELTA_WORD_SENTENCE = 0.008;
var DELTA_SENTENCE_README = 0.0002;
var DELTA_SECTION_README = 0.13;
var CHANCE_OF_SNIPPET = 0.6;

function normalize(arr) {
    var runSum = 0;
    var sum = arr.reduce((a, b) => a + b, 0);
    for (var i = 0; i < arr.length; i++){
        arr[i] = (arr[i]/sum) + runSum;
        runSum += arr[i];
    }
    return arr;
    //return arr.map(val => val / sum);
}

// Probabilities
// Format is [noun, verb, adj, adv, interj, city, dem, art]
// PROBABILITIES.x is the array xProb
// var PROB_KEYS = ["noun", "verb", "adj", "adv", "interj", "city", "dem", "art"];
var PROB_KEYS = ["CC", "DT", "IN", "JJ", "JJR", "MD", "NN", "NNP", "NNS", "PRP", "RB", "RBR", "RP", "TO", "VB", "VBD", "VBG", "VBN", "VBP", "VBZ", "WDT", "WRB"];

// function getNextWord(prev) returns a new word based on prev
// prev is a string from PROB_KEYS
function getNextPart(prev) {
    var prevIdx = PROB_KEYS.indexOf(prev);
    var rand = Math.random();
    var curr = Object.keys(PROBABILITIES[prev]);
    var currVal = [];
    for(key in curr){
        currVal.push(PROBABILITIES[prev][curr[key]]);
    }
    // console.log(curr);
    // console.log(currVal);

    currVal = normalize(currVal);

    for (let i = 0; i < currVal.length; i++) {
        if (rand < currVal[i]) {
            return curr[i];
        }
    }
    return curr[0];
}

function getWord(partOfSpeech) {
    var dict = DICTIONARY[partOfSpeech];
    if (!dict){
        return "";
    }
    var randIdx = Math.floor(Math.random() * dict.length);
    return dict[randIdx];
}

function generateTitle() {
    var noun = getWord("NN");
    var noun2 = getWord("NN");
    return noun[0].toUpperCase() + noun.substr(1, 3) + noun2[0].toUpperCase() + noun2.substr(1, noun2.length);
}

function generateParagraph(titleVal) {
    // Counts up how many words are in a
    // sentence and how many in a word.  
    // Sentence counter resets at end of each sentence.
    var docWordCounter = 0;
    var sentenceWordCounter = 0;
    var currDocEndProb = 0;
    var currSentenceEndProb = 0;
    var isNewSentence = true;
    var titleProb = 0.05;

    var randDocKey = Math.random();
    var randSentenceKey = Math.random();

    var README = "";
    var prevPartOfSpeech = (Math.random() < 0.7) ? PROB_KEYS[6] : PROB_KEYS[8];

    // Loop to generate readme
    while (randDocKey > currDocEndProb) {
        var currSentence = getWord(prevPartOfSpeech);
        prevPartOfSpeech = getNextPart(prevPartOfSpeech);
        currSentenceEndProb = currSentenceEndProb + DELTA_WORD_SENTENCE;

        randSentenceKey = Math.random();
        // Loop to generate sentence
        while (randSentenceKey > currSentenceEndProb) {
            if (Math.random() < titleProb){
                currSentence = currSentence + ' ' + titleVal;
            }
            currSentence = currSentence + ' ' + getWord(prevPartOfSpeech);
            prevPartOfSpeech = getNextPart(prevPartOfSpeech);
            currSentenceEndProb += DELTA_WORD_SENTENCE;
            sentenceWordCounter += 1;
            randSentenceKey = Math.random();
        }
        if (isNewSentence && currSentence){
            currSentence = currSentence[0].toUpperCase() + currSentence.substr(1, currSentence.length);
        }
        if (sentenceWordCounter > 0 && sentenceWordCounter < 4 && Math.random() < 0.4){
            // With probability 0.4, make a short sentence into a clause
            currSentence = currSentence + ', ';
            isNewSentence = false;
        } else if (sentenceWordCounter > 0){
            currSentence = currSentence + '. ';
            isNewSentence = true;
        } else {
            currSentence = currSentence + ' ';
            isNewSentence = false;
        }
        README = README + currSentence;
        sentenceWordCounter = 0;
        currDocEndProb = currDocEndProb + DELTA_SENTENCE_README;
        randDocKey = Math.random();
    }
    if (README[README.length-1] != '.' && README[README.length-2] != '.'){
        if (README[README.length-1] == ' '){
            README = README.substr(0, README.length-1) + '.';
        }
        else {
            README += '.';
        }
    }

    return README;

}

function generateCodeSnippet(snippetLibrary){
    var retVal = "";
    var randKey = Math.ceil(Math.random()*40);
    var startIdx = Math.floor(Math.random() * snippetLibrary.length);
    for (var i = startIdx; i < Math.min(startIdx + randKey, snippetLibrary.length); i++){
        retVal+= snippetLibrary[i]+ "\r\n";
    }
    return retVal;
}

function generateReadme(titleVal, snippetLibrary){
    var idx = 1;
    var secProb = 0;
    var randSecKey = Math.random();
    var retVal = [];
    retVal[0] = {
        key: "Introduction",
        data: generateParagraph(titleVal)
    };
    while (randSecKey > secProb){
        secProb += DELTA_SECTION_README;
        randSecKey = Math.random();
        var newParagraph = generateParagraph(titleVal);
        let newEntry = {};
        newEntry.key = getWord("NN");
        newEntry.key = newEntry.key[0].toUpperCase() + newEntry.key.substr(1, newEntry.length);
        newEntry.data = newParagraph;
        retVal[idx++] = newEntry;

        // Do we add a code snippet?
        if (Math.random() < CHANCE_OF_SNIPPET){
            retVal[idx++] = {
                key: "Example",
                data: generateCodeSnippet(snippetLibrary)
            };
        }

    }
    return retVal;
}

function markdownConvert(title, readme, builtWith){
    var generated = "# " + title + "\r\r";
    for (var i = 0; i < readme.length; i++){
        generated += "## " + readme[i].key + "\r";
        if (readme[i].key == "Example"){
            generated += "```\r" + readme[i].data + "```\r\r";
        } else {
            generated += readme[i].data + "\r\r";
        }
    }
    //generated+="# Examples\r```\r";
    //generated+="var foo = true;\r\rif(!foo){\r    return 5;\r}\relse{\r    return 6;\r}\r\r";
    //generated+="```\r";

    generated+= "## Built With\n\n";
    for (var j = 0; j < builtWith.length; j++){
        generated+="* " + builtWith[j] + "\r";
    }
    return generated;

}
