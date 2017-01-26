function [chorus,title] = TitleGen(syllables,lines)
%Generates a chorus based on Pitbull dictionaries
n = lines; %number of lines
s = syllables; %number of syllables per line


%define sentence structures

S1 = makeSentenceStruct('S1','firstpron');
S2 = makeSentenceStruct('S2','secondpron');
S3 = makeSentenceStruct('S3','thirdpron');
S4 = makeSentenceStruct('S4','posspron');
S5 = makeSentenceStruct('S5','demonstrative');
VL = makeSentenceStruct('VL','verb');
AL = makeSentenceStruct('AL','adj');

sentenceStructArray = {S1 S2 S3 S4 S5 VL AL};

%generate sentence structures
sentenceTypes = sentenceStructArray;
sentenceProbs = [20 25 25 20 5 1 2 ;...
    20 15 10 15 20 7 2 ;...
    10 15 2 7 5 11 30 ;...
    5 5 15 20 3 20 17 ;...
    15 25 10 5 5 20 10 ;...
    10 10 10 10 7 23 20 ;...
    10 15 15 10 7 23 20];
sStructs = MarkovMatrix(7,sentenceTypes,sentenceProbs);
sSequence= MarkovChain(sStructs,n);






%generate syllable divisions

syllableTypes = {1};
syllableProbs = 1;
syllableStructs = MarkovMatrix(n,syllableTypes,syllableProbs);
for i = 1:1:n
    
    sylSentences = MarkovChain(syllableStructs,s);
    sentenceChain{i} = SyllableChain(sylSentences,s);
    
    
end




%generate parts of speech
wordTypes = {'Subject' 'Verb' 'Object' 'Adjective' 'Adverb'};
LineProb = ...
    [0 3 0 5 0;...
    6 4 6 0 4;...
    0 2 0 2 0;...
    3 6 3 3 2;...
    3 1 2 0 3];
wordTypesMatrix = MarkovMatrix(length(wordTypes),wordTypes,LineProb);
for sentence = 1:1:length(sentenceChain)
    i = (length(sentenceChain{sentence}.sChain));
    for line = 1:1:length(sentenceChain)
        if sSequence.endChain(line) <=3
            wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,1);
        elseif sSequence.endChain(line) == 4
            wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,1);
            
            wordTypesStruct{sentence}.converted = ['possPron' wordTypesStruct{sentence}.converted];
        elseif sSequence.endChain(line) == 5
            wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,2);
        elseif sSequence.endChain(line) == 6
            wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,3);
        elseif sSequence.endChain(line) == 7
            wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i-1,1);
            wordTypesStruct{sentence}.converted = ['demonstrative' wordTypesStruct{sentence}.converted];
        end
    end
    
end
 %set up dictionaries
    adjDict = dictionary('res/adj.txt');
    advDict = dictionary('res/adv.txt');
    nounDict = dictionary('res/noun.txt');
    verbDict = dictionary('res/verb.txt');
    cityDict = dictionary('res/city.txt');
    interjDict = dictionary('res/interjections.txt');
    pronDict = dictionary('res/pronouns.txt');
    posspronDict = dictionary('res/possProns.txt');
    demonstrativeDict = dictionary('res/demonstratives.txt');

%create title
title = generateTitle(sentenceChain{1}.sChain,nounDict,verbDict,adjDict,demonstrativeDict,pronDict);


function title = generateTitle(sylArray,nounDict,verbDict,adjDict,demonstrativeDict,pronDict)
%Generates Pitbull style title based on array of syllables
%T1 = Noun; T2 = Adjective, Noun; T3 = Verb, Demonstrative, Noun; T4 =
%Pronoun,Verb, Noun

%%find length of sylArray
%maxInd = 1;
%for i = 1:1:length(sylArray)
%    if sylArray(i) ~=0
%        maxInd = i;
%    end
%end
titleType = ceil(rand*3);
if titleType ==1
    title = [ {nounDict.getWord()} ' '];
elseif titleType ==2
    title = cell(1,2);
    title{1} = [ adjDict.getWord() ' '];
    title{2} = [ nounDict.getWord() ' '];
elseif titleType == 3
    title = cell(1,3);
    title{1} = [ verbDict.getWord() ' '];
    title{2} = [ demonstrativeDict.getWord() ' '];
    title{3} = [ nounDict.getWord() ' '];
    
else
    title = cell(1,3);
    title{1} = [pronDict.getWord() ' '];
    title{2} = [verbDict.getWord() ' '];
    title{3} = [nounDict.getWord() ' '];
end






