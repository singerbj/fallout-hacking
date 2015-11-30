var app = angular.module('app', []);

app.controller('Controller', ["$scope", "$http", "$q", function ($scope, $http, $q) {
    var self = this;
    self.symbols = ['!','@','$','.','|','#',';',':','-','"','\'','/','\\','+','=','<','>','{','}','[',']','(',')'];
    self.containSymbols = [['<','>'],['[',']'],['{','}'],['(',')']];
    self.wordLength = 6;
    self.terminalRows = 34;
    self.terminalCols = 12;
    self.tries = ['try', 'try', 'try', 'try'];
    self.logList = [];
    self.wordsPerGame = Math.floor((self.terminalCols * self.terminalRows) / 40);
    self.helpersPerGame = Math.floor(((self.terminalCols * self.terminalRows) / 50) * 0.666);
    self.gameState = 'loading'; //loading, playing, won, lost

    // self.wordList = [];
    // self.wordList = ['kitten', 'bitten', 'oddity', 'flyboy'];
    self.wordList = ["junket", "famish", "ponton", "hereat", "unlust", "velure", "lachsa", "trotol", "photic", "milder", "flyboy", "gaunty", "umbrel", "nectar", "oddity", "eddish", "calais", "ensate", "fresno", "debate", "teameo", "peeler", "panman", "misery", "creese", "phloem", "lemnad", "unruth", "module", "oroide", "kakkak", "unclad", "cornel", "congou", "shrewd", "woomer", "gambet", "pipped", "garrot", "sypher", "annite", "vedana", "gringo", "scovel", "dvaita", "jurist", "sedent", "enlard", "amuyon", "cogway", "zygion", "halebi", "brewer", "scutel", "scroop", "aecium", "fizzer", "anotta", "spined", "killcu", "stanza", "reeker", "recure", "parado", "unkind", "ipecac", "lumpet", "redowa", "embryo", "sprawl", "thysen", "typhus", "blowup", "manure", "bregma", "slouch", "walrus", "raucid", "fautor", "bovine", "tetryl", "serene", "bodied", "bafaro", "humify", "burned", "unclew", "graben", "myzont", "uronic", "bavary", "comoid", "unspan", "hackin", "muscot", "koilon", "warded", "wallop", "lysate", "bedkey", "furoid", "suable", "shiner", "woeful", "embind", "churly", "bhoosa", "malice", "fidget", "zymase", "cabana", "mester", "pegged", "engaze", "nurhag", "patine", "gyrene", "effort", "volupt", "warmus", "rivage", "lagend", "bannut", "thrang", "taxing", "relict", "unpray", "merely", "bereft", "rebone", "moudie", "tusser", "trench", "braver", "humlie", "enserf", "pallah", "avital", "fleecy", "unrein", "hoddle", "pontal", "arouse", "abaser", "daroga", "stumpy", "sepium", "galiot", "gomart", "rublis", "ferula", "legume", "clergy", "geraty", "uprive", "burlet", "piline", "jassid", "chinky", "sebait", "massif", "encurl", "dogger", "preeze", "fulzie", "grosso", "warmer", "gleary", "rebute", "relift", "leaden", "herein", "flewit", "unfool", "leally", "gaggle", "repump", "chirpy", "kroner", "shoder", "lignum", "tremie", "unbarb", "hydrol", "figure", "citole", "carboy", "cerago", "effect", "unduly", "flatly", "shelta", "copula", "cockly", "escape", "booter", "pitman", "soaked", "hobbet", "mossed", "statal", "nonion", "chrome", "starer", "wahahe", "upsuck", "seaman", "tercel", "lenity", "sulcar", "vacouf", "panful", "unless", "sealed", "agouti", "motyka", "scrapy", "snoozy", "alroot", "sheath", "tatler", "uranyl", "blinks", "pliant", "uropod", "couxia", "rondel", "persis", "kemple", "beltie", "piggle", "jacami", "phrase", "jenkin", "volute", "amoeba", "scuddy", "nerver", "humbug", "genial", "agrufe", "upbind", "yeller", "hognut", "clunch", "pandle", "sepsis", "knight", "olefin", "lunary", "owlism", "musher", "amunam", "stadic", "number", "global", "spadix", "slavey", "crusta", "byname", "cuttoo", "frijol", "soodle", "pupelo", "tussis", "halves", "devour", "firmly", "larvae", "blinks", "runkly", "junior", "inogen", "vimful", "cinter", "taraph", "unlimb", "funest", "oilman", "winful", "dingly", "vakass", "tunful", "santal", "ransel", "seduce", "motive", "impest", "heppen", "judger", "agaric", "eclair", "silken", "portia", "ricrac", "accost", "sheard", "locule", "rindle", "crenel", "nodule", "vallis", "aurous", "yabber", "gawcie", "curing", "feisty", "geneki", "avowed", "unrank", "opiate", "ustion", "diaper", "pandle", "street", "affray", "octant", "verily", "unprim", "cimbia", "sambal", "pantry", "wauner", "beshod", "burker", "wished", "cedrat", "outvie", "mettle", "gushet", "updrag", "sauqui", "sugary", "dobrao", "scapus", "obtund", "elance", "sepian", "snifty", "upseal", "patter", "saulie", "proved", "gobber", "lucent", "squire", "solder", "larine", "relict", "dorlot", "vulval", "certis", "tropal", "chigoe", "vacate", "canzon", "turnel", "thwite", "wagaun", "thanks", "inarch", "salver", "heptyl", "skance", "garrot", "hooker", "cochal", "haunty", "flossy", "geotic", "immane", "tonite", "kosong", "flatly", "peanut", "obtuse", "terret", "tinety", "puntel", "pallet", "ridger", "feddan", "tonger", "cutler", "sozzly", "pellet", "formal", "unwild", "alexic", "insert", "tusker", "balden", "taller", "arcana", "restis", "sirpea", "tebbet", "sugary", "repute", "timbal", "unduly", "avichi", "hulloo", "canful", "verite", "zincic", "beluga", "sunder", "mediad", "colmar", "botany", "gimmer", "gleamy", "stound", "spetch", "decury", "perron", "agonic", "cadjan", "cladus", "clothy", "clicky", "depone", "ethane", "ogrism", "diiamb", "oilcan", "stager", "casson", "ripgut", "taille", "madame", "brough", "bangle"];
    self.wordMap = {};
    self.wordToUse = "";

    self.setupGame = function(){
        self.wordCount = 0;
        self.gameState = 'loading';
        var promises = [];
        self.wordList = [];
        $('#words').empty();
        // var goodWords = 0;
        for (var i = 0; i < 500; i++) {
            promises.push($http.get('//randomword.setgetgo.com/get.php?len=' + self.wordLength).success(function (data) {
                if (data.substring(0, 1) !== data.substring(0, 1).toUpperCase()) {
                    self.wordList.push(data);
                    // goodWords += 1;
                }
                self.wordCount += 1;
                self.loadingPercent = Math.floor((self.wordCount / 500) * 100);
            }).error(function (error) {
                console.error(error);
            }));
        }

        $q.all(promises).then(function () {
            // console.log(self.wordList.length);
            // console.log(JSON.stringify(self.wordList));

            self.gameState = 'playing';
            self.wordToUse = "";
            self.wordList = self.wordList.map(function(word){
                return word.toUpperCase();
            });

            self.wordList.forEach(function(word1){
                // if(!self.wordMap[word1]){
                    self.wordMap[word1] = {};
                    for(var i = 0; i < self.wordLength; i++){
                        self.wordMap[word1][i] = [];
                    }
                    self.wordList.forEach(function(word2){
                        var alikes = 0;
                        for(var i = 0; i < self.wordLength; i++){
                            if(word1[i] === word2[i]){
                                alikes += 1;
                            }
                        }
                        if(alikes > 0 && alikes < self.wordLength && self.wordMap[word1][alikes].indexOf(word2) < 0){
                            self.wordMap[word1][alikes].push(word2);
                        }

                    });
                    self.wordMap[word1].strength = 0;
                    for(var i = 0; i < self.wordLength; i++){
                        self.wordMap[word1].strength = self.wordMap[word1].strength + ((self.wordMap[word1][i].length + 1) * (Math.pow(2, i * i)));
                    }
                // }
            });

            self.wordToUse = self.wordList[0];
            self.lowest = self.wordList[0];
            for(var word in self.wordMap){
                if(self.wordMap[word] && self.wordMap[word].strength > self.wordMap[self.wordToUse].strength){
                    self.wordToUse = word;
                }
                if(self.wordMap[word] && self.wordMap[word].strength < self.wordMap[self.wordToUse].strength){
                    self.lowest = word;
                }
            }

            console.log(self.wordToUse, self.wordMap[self.wordToUse]);
            // console.log(self.lowest, self.wordMap[self.lowest]);
            // console.log(self.wordMap);
            // console.log(self.wordList);

            var wordsToUse = [];
            var helpersToUse = [];

            var wordsPerAlike = Math.floor(self.wordsPerGame / self.wordLength) + 1;

            for(var i = (self.wordLength - 1); i > 1; i--){
                if(wordsToUse.length == self.wordsPerGame) break;
                for(var j = 0; j < wordsPerAlike; j++){
                    if(wordsToUse.length == self.wordsPerGame) break;
                    if(self.wordMap[self.wordToUse][i][j]){
                        wordsToUse.push(self.wordMap[self.wordToUse][i][j]);
                    }
                }
            }
            var counter = 0;
            var someLeft = true;
            while(wordsToUse.length < self.wordsPerGame && someLeft){
                if(self.wordMap[self.wordToUse][1][counter]){
                    wordsToUse.push(self.wordMap[self.wordToUse][1][counter]);
                    counter += 1;
                }else{
                    someLeft = false;
                }
            }
            console.log(wordsToUse);
            // console.log(self.helpersPerGame);
            for(var i = 0; i < self.helpersPerGame; i++){
                var helperLength = self.getRandom(2, self.terminalCols);
                var helperPair = self.getRandom(2, self.containSymbols.length);
                var helper = self.containSymbols[helperPair][0];
                for(var j = 0; j < self.helpersPerGame + 1; j++){
                    helper = helper + self.symbols[self.getRandom(0, self.symbols.length)];
                }
                helper = helper + self.containSymbols[helperPair][1];
                helpersToUse.push(helper);
            }
            // console.log(helpersToUse);
            helpersToUse.forEach(function(helper){
                wordsToUse.splice(self.getRandom(0, wordsToUse.length), 0, helper);
            });
            // console.log(wordsToUse);
            wordsToUse.splice(self.getRandom(0, wordsToUse.length), 0, self.wordToUse);
            wordsToUse = wordsToUse.join(',' + self.symbols[self.getRandom(0, self.symbols.length)] + ',').split(',');
            var totalChars = wordsToUse.join('').length;

            var charsLeft = (self.terminalCols * self.terminalRows) - totalChars;

            for(var i = 0; i < charsLeft; i++){
                wordsToUse.splice(self.getRandom(0, wordsToUse.length), 0, (self.symbols[self.getRandom(0, self.symbols.length)]));
            }

            var charObjs = [];
            var key = 0;
            var id = 0;
            wordsToUse.forEach(function(word){
                if(word.length > 1){
                    word.split('').forEach(function(char){
                        charObjs.push({ id: id, char: char, key: key })
                    });
                    key += 1;
                }else{
                    charObjs.push({ id: id, char: word })
                }
                id += 1;
            });

            var rows = [];
            for(var i = 0; i < self.terminalRows; i++){
                var cols = [];
                for(var j = 0; j < self.terminalCols; j++){
                    cols.push(charObjs.splice(0, 1)[0]);
                }
                rows.push(cols);
            }

            self.terminalLeft = rows.splice(0, rows.length / 2);
            self.terminalRight = rows;

            console.log(self.terminalLeft.length, self.terminalRight.length)

        });
    };


    self.hover = function(colHover){
        colHover.highlight = true;
        self.terminalLeft.forEach(function(row){
            row.forEach(function(col){
                if(colHover.id == col.id || (colHover.key && colHover.key === col.key)){
                    col.highlight = true;
                }else{
                    col.highlight = false;
                }
            });
        });

        self.terminalRight.forEach(function(row){
            row.forEach(function(col){
                if(colHover.id == col.id || (colHover.key && colHover.key === col.key)){
                    col.highlight = true;
                }else{
                    col.highlight = false;
                }
            });
        });
    };

    self.click = function(colClick){
        if(self.gameState === 'playing'){
            var word = "";
            self.terminalLeft.forEach(function(row){
                row.forEach(function(col){
                    if(colClick.key == col.key){
                        word = word + col.char;
                    }
                });
            });

            self.terminalRight.forEach(function(row){
                row.forEach(function(col){
                    if(colClick.key == col.key){
                        word = word + col.char;
                    }
                });
            });
            if(word[0].toLowerCase() !== word[0]){
                self.guessWord(word);
            }else{
                self.processHelper(word);
            }
        }
    };

    self.guessWord = function(word){
        console.log(self.wordMap[word]);
        self.log(word);
        if(word === self.wordToUse){
            self.gameState = 'won';
            self.log("PASSWORD ACCEPTED");
            self.log("SYSTEM LOADING...");
        }else{
            self.tries.splice(0, 1);
            self.log("ENTRY DENIED")
            var alikes = 0;

            for(var i = 0; i < self.wordLength; i++){
                if(self.wordToUse[i] === word[i]){
                    alikes += 1;
                }
            }
            self.log("LIKENESS: " + alikes);
        }

    };

    self.log = function(string){
        self.logList.unshift(string.toUpperCase());
    };

    self.processHelper = function(helper){
        console.log(helper);
    };

    self.getRandom = function(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    };

    self.setupGame();

}]);
