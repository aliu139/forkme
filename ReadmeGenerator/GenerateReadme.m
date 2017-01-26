clear all

%Script generates a readme based on dictionaries
numberOfChoruses = 0; % No chorus in a README
n = 60; %number of lines to be generated 
s = 8; %number of syllables per line
probInterj = 0.2; %percent chance of the readme line starting with an intejection
probCities = 0.2; %percent chance of developer listing random cities
numberOfSongs = 1; %number of songs to generate

for currentSong = 1:1:numberOfSongs
    
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
    
    syllableTypes = {1 2 3};
    syllableProbs = ...
        [3 3 4;...
        5 2 2;...
        2 1 0];
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
        3 1 3 3 2;...
        3 5 2 0 3];
    wordTypesMatrix = MarkovMatrix(length(wordTypes),wordTypes,LineProb);
    for sentence = 1:1:length(sentenceChain)
        
        
        
        i = (length(sentenceChain{sentence}.sChain));
        for line = 1:1:i
            if sSequence.endChain(line) <=3
                wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,1);
            elseif sSequence.endChain(line) == 4
                wordTypesStruct{sentence} = MarkovChain(wordTypesMatrix,i,4);
                
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
        
        
        if rem(sentence,4) ==0
            randN = abs(rand);
            if randN < probCities
                wordTypesStruct{sentence} = MarkovCitiesChain(length(sentenceChain{sentence}.sChain),wordTypesStruct{sentence-1}.endVal);
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
    
    %create poem cell array
    %sSequence = sequence of sentence structures
    %sentenceChain{sentence} = array of syllable chains
    %wordTypesStruct{sentence} = array of word types
    for i = 1:1:length(sSequence.converted)
        rapLine{i} = cell(1,length(sSequence.converted));
        if ~strcmp(wordTypesStruct{i}.converted{1},'city')
            if sSequence.endChain(i) <=3
                rapLine{i}{1} = pronDict.getWord;
            elseif sSequence.endChain(i) ==4
                rapLine{i}{1} = posspronDict.getWord;
            elseif sSequence.endChain(i) == 5
                rapLine{i}{1} = demonstrativeDict.getWord;
            elseif sSequence.endChain(i)==6
                rapLine{i}{1} = verbDict.getWord;
            elseif sSequence.endChain(i)==7
                rapLine{i}{1} = adjDict.getWord;
            end
        else
            rapLine{i}{1} = cityDict.getWord;
        end
        
        for word = 2:1:(length(sentenceChain{i}.sChain))
            
            if sentenceChain{i}.sChain(word)==0
                rapLine{i}{word} = 'lineBreak';
            else
                if strcmp(wordTypesStruct{i}.converted{word},'Verb')
                    rapLine{i}{word} = verbDict.getWord;
                elseif strcmp(wordTypesStruct{i}.converted{word},'Subject')
                    rapLine{i}{word} = nounDict.getWord;
                elseif strcmp(wordTypesStruct{i}.converted{word},'Adjective')
                    rapLine{i}{word} = adjDict.getWord;
                elseif strcmp(wordTypesStruct{i}.converted{word},'Adverb')
                    rapLine{i}{word} = advDict.getWord;
                elseif strcmp(wordTypesStruct{i}.converted{word},'Object')
                    rapLine{i}{word} = nounDict.getWord;
                elseif strcmp(wordTypesStruct{i}.converted{word},'city')
                    rapLine{i}{word} = cityDict.getWord;
                end
                
            end
        end
        
        
    end
    
    %chance of "synergy",  "agile", standup at beginning
    for line = 1:1:length(rapLine)
        randN = abs(rand);
        if randN < probInterj
            rapLine{line} = [interjDict.getWord rapLine{line}];
        end
    end
    for i = 1:1:length(rapLine)
        rapLine{i} = [rapLine{i} 'lineBreak'];
    end
    %creates song title, chorus
    [~,title] = TitleGen(s,4);
    
    
    %print poem cell array
    outputPoem = fopen(['output/' title{:} '.txt'],'w');
    fprintf(outputPoem,'Program Name: ');
    fprintf(outputPoem,'%s',title{:});
    fprintf(outputPoem,'\n');
    fprintf(outputPoem,'\n');
    fprintf(outputPoem,'Developer:  READMEGen');
    fprintf(outputPoem,'\n');
    fprintf(outputPoem,'\n');
    numChorusR = numberOfChoruses;
    for line = 1:1:length(rapLine)
        word = 1;
        while word <= length(rapLine{line})
            currWord = rapLine{line}{word};
            if word == 1 && ~isempty(currWord)
                currWord(1)= upper(currWord(1));
            end
            if ~strcmp(currWord,'lineBreak')
                if (word ~=1)
                    fprintf(outputPoem, ' ');
                end
                fprintf(outputPoem,'%s',currWord);
                word = word + 1;
            else
                fprintf(outputPoem,'. ');
                word = length(rapLine{line})+1;
            end
        end
        if (~rem(line,(ceil(rand * 6))))
            fprintf(outputPoem,'\n');
            if rem(line,8)==0 && numChorusR ~=0 || line == length(rapLine)
                numChorusR = numChorusR-1;
                fprintf(outputPoem,'\n');
            end
        end
    end
    fprintf(outputPoem,'\n');
    fclose(outputPoem);
end
