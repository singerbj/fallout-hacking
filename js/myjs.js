var app = angular.module('app', []);

app.controller('Controller', ["$scope", "$http", "$q", function ($scope, $http, $q) {
    var self = this;
    self.wordLength = 6;
    // self.wordList = [];
    self.wordList = ["junket", "famish", "ponton", "hereat", "unlust", "velure", "lachsa", "trotol", "photic", "milder", "flyboy", "gaunty", "umbrel", "nectar", "oddity", "eddish", "calais", "ensate", "fresno", "debate", "teameo", "peeler", "panman", "misery", "creese", "phloem", "lemnad", "unruth", "module", "oroide", "kakkak", "unclad", "cornel", "congou", "shrewd", "woomer", "gambet", "pipped", "garrot", "sypher", "annite", "vedana", "gringo", "scovel", "dvaita", "jurist", "sedent", "enlard", "amuyon", "cogway", "zygion", "halebi", "brewer", "scutel", "scroop", "aecium", "fizzer", "anotta", "spined", "killcu", "stanza", "reeker", "recure", "parado", "unkind", "ipecac", "lumpet", "redowa", "embryo", "sprawl", "thysen", "typhus", "blowup", "manure", "bregma", "slouch", "walrus", "raucid", "fautor", "bovine", "tetryl", "serene", "bodied", "bafaro", "humify", "burned", "unclew", "graben", "myzont", "uronic", "bavary", "comoid", "unspan", "hackin", "muscot", "koilon", "warded", "wallop", "lysate", "bedkey", "furoid", "suable", "shiner", "woeful", "embind", "churly", "bhoosa", "malice", "fidget", "zymase", "cabana", "mester", "pegged", "engaze", "nurhag", "patine", "gyrene", "effort", "volupt", "warmus", "rivage", "lagend", "bannut", "thrang", "taxing", "relict", "unpray", "merely", "bereft", "rebone", "moudie", "tusser", "trench", "braver", "humlie", "enserf", "pallah", "avital", "fleecy", "unrein", "hoddle", "pontal", "arouse", "abaser", "daroga", "stumpy", "sepium", "galiot", "gomart", "rublis", "ferula", "legume", "clergy", "geraty", "uprive", "burlet", "piline", "jassid", "chinky", "sebait", "massif", "encurl", "dogger", "preeze", "fulzie", "grosso", "warmer", "gleary", "rebute", "relift", "leaden", "herein", "flewit", "unfool", "leally", "gaggle", "repump", "chirpy", "kroner", "shoder", "lignum", "tremie", "unbarb", "hydrol", "figure", "citole", "carboy", "cerago", "effect", "unduly", "flatly", "shelta", "copula", "cockly", "escape", "booter", "pitman", "soaked", "hobbet", "mossed", "statal", "nonion", "chrome", "starer", "wahahe", "upsuck", "seaman", "tercel", "lenity", "sulcar", "vacouf", "panful", "unless", "sealed", "agouti", "motyka", "scrapy", "snoozy", "alroot", "sheath", "tatler", "uranyl", "blinks", "pliant", "uropod", "couxia", "rondel", "persis", "kemple", "beltie", "piggle", "jacami", "phrase", "jenkin", "volute", "amoeba", "scuddy", "nerver", "humbug", "genial", "agrufe", "upbind", "yeller", "hognut", "clunch", "pandle", "sepsis", "knight", "olefin", "lunary", "owlism", "musher", "amunam", "stadic", "number", "global", "spadix", "slavey", "crusta", "byname", "cuttoo", "frijol", "soodle", "pupelo", "tussis", "halves", "devour", "firmly", "larvae", "blinks", "runkly", "junior", "inogen", "vimful", "cinter", "taraph", "unlimb", "funest", "oilman", "winful", "dingly", "vakass", "tunful", "santal", "ransel", "seduce", "motive", "impest", "heppen", "judger", "agaric", "eclair", "silken", "portia", "ricrac", "accost", "sheard", "locule", "rindle", "crenel", "nodule", "vallis", "aurous", "yabber", "gawcie", "curing", "feisty", "geneki", "avowed", "unrank", "opiate", "ustion", "diaper", "pandle", "street", "affray", "octant", "verily", "unprim", "cimbia", "sambal", "pantry", "wauner", "beshod", "burker", "wished", "cedrat", "outvie", "mettle", "gushet", "updrag", "sauqui", "sugary", "dobrao", "scapus", "obtund", "elance", "sepian", "snifty", "upseal", "patter", "saulie", "proved", "gobber", "lucent", "squire", "solder", "larine", "relict", "dorlot", "vulval", "certis", "tropal", "chigoe", "vacate", "canzon", "turnel", "thwite", "wagaun", "thanks", "inarch", "salver", "heptyl", "skance", "garrot", "hooker", "cochal", "haunty", "flossy", "geotic", "immane", "tonite", "kosong", "flatly", "peanut", "obtuse", "terret", "tinety", "puntel", "pallet", "ridger", "feddan", "tonger", "cutler", "sozzly", "pellet", "formal", "unwild", "alexic", "insert", "tusker", "balden", "taller", "arcana", "restis", "sirpea", "tebbet", "sugary", "repute", "timbal", "unduly", "avichi", "hulloo", "canful", "verite", "zincic", "beluga", "sunder", "mediad", "colmar", "botany", "gimmer", "gleamy", "stound", "spetch", "decury", "perron", "agonic", "cadjan", "cladus", "clothy", "clicky", "depone", "ethane", "ogrism", "diiamb", "oilcan", "stager", "casson", "ripgut", "taille", "madame", "brough", "bangle"];

    self.getWords = function () {
        var promises = [];
        self.wordList = [];
        $('#words').empty();
        // var goodWords = 0;
        for (var i = 0; i < 500; i++) {
            promises.push($http.get('//randomword.setgetgo.com/get.php?len=' + self.wordLength).success(function (data) {
                if (data.substring(0, 1) !== data.substring(0, 1).toUpperCase()) {
                    self.wordList.push(data);
                    $('#words').append(data + '<br>');
                    // goodWords += 1;
                }
            }).error(function (error) {
                console.error(error);
            }));
        }

        $q.all(promises).then(function () {
            console.log(self.wordList.length);
            console.log(JSON.stringify(self.wordList));
        });

    };

}]);
