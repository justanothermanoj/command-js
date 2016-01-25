// Version 0.1


window.SpeechRecognition = window.SpeechRecognition ||
    window.webkitSpeechRecognition ||
    null;


var comjs = (function () {

    var parser = function (text) {
        text = $.trim(text);
        var array = text.split(' ');
        return array;
    }

    var execute = function (text) {
        var parse = parser(text);
        console.log(parse);
        var func = search(parse[0]);
        if (func) {
            func.code(parse);
        }
    }

    var search = function (command) {
        if (modules.hasOwnProperty(command)) {
            return modules[command];
        } else {
            return false;
        }

    }

    var modules = {};


    var recognizer = (function () {
        return (new window.SpeechRecognition);
    }())

    var store = function (object) {
        modules[object.name] = object;
        console.log(modules);
    }
    var start = function () {
        this.recognizer.continuous = true;
        this.recognizer.start();
        this.recognizer.onresult = function (event) {

            for (var i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    execute(event.results[i][0].transcript);
                } else {
                    console.log(event.results[i][0].transcript);
                }
            }
        };

    }

    var comjs = {

        parser: parser,
        execute: execute,
        search: search,
        modules: modules,
        recognizer: recognizer,
        store: store,
        start: start

    };

    return comjs;
}());

comjs.store({
    name: 'refresh',
    code: function (parse) {
        location.reload();
    },
    info: "Refresh the page"
})

comjs.store({
    name: 'output',
    code: function (parse) {
        var str = '';
        for( var i = 1; i < parse.length; i++) {
            str += ' ' + parse[i];
        }
        console.log(str);
    },
    info: "output given string"
})

comjs.store({
    name: 'search',
    code: function (parse) {
        var query = '';
        for( var i = 1; i < parse.length; i++){
            if(i !== 1) {
                query += '+';
            }
            query += parse[i];
        }
        console.log('http://google.com/#q='+query);
        var redirectWindow = window.open('https://google.com/#q='+query, '_blank');
        redirectWindow.location;
    },
    info: "output given string to console"
})