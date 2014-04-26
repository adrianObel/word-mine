var fs = require('fs');

var Mine = (function() {

  function Mine() {
    this._dict = {};
    this._preparedDict = {};
  }

  var search = Mine.prototype;

  search.parseText = function(text, options, callback) {
    
    text = text
      .replace(/(\r\n|\n|\r)/gm,' ') // Remove line break 
      .replace(/\s+/g,' ') // Remove extra whitespace
      .replace(/\W/g, ' '); // Remove non alphanumerical

    var words = text.split(' ');
    var self = this;

    words.forEach(function(word) {

      word = word.toLowerCase();

      self._dict[word] = self._dict[word] 
      ? ++self._dict[word]
      : 1;

    });

    delete this._dict['']; // Remove empty space

    if(arguments.length === 2) {
      callback = options;
    } else {

      if(options['order']) {
        this._sort();
      }

    }
    
    this._prepareResponse();
    return callback(this._preparedDict);

  };

  search.parseFile = function(files, options, callback) {

    if(typeof files === 'string') {
      files = [files];
    }

    this._mineFile(files, options, callback);

  };

  search._mineFile = function(files, options, callback, i, bigData) {

    if(!i) {
      i = 0; 
    }

    if(bigData) {
      bigData += bigData;
    }

    var self = this;

    fs.readFile(files[i], 'utf8', function(err, data) {
    
      if(err) {
        console.log(err);
      }

      if(i < files.length - 1) {
        return options
          ? self._mineFile(files, options, callback, ++i, data)
          : self._mineFile(files, callback, ++i, data);
      }

      bigData += data;

      return options 
        ? self.parseText(bigData, options, callback)
        : self.parseText(bigData, callback);
    });

  };

  search._prepareResponse = function() {

    var keys = Object.keys(this._dict);

    for (var i = keys.length - 1; i >= 0; i--) {
      
      var key = keys[i];
      var prep = this._preparedDict[i] = {};
      prep[key] = this._dict[key];

    };

  };

  search._sort = function() {
    
    var self = this;
    var ordered = [];
    var orderedDict = {};

    for(var word in this._dict) {
      ordered.push([word, this._dict[word]]);
    }

    ordered.sort(function(a, b) {
      return b[1] - a[1];
    });

    ordered.forEach(function(w) {
      var key = w[0];

      orderedDict[key] = w[1]; 

    });

    return this._dict = orderedDict;

  };

  return Mine;

})();

exports = module.exports = new Mine();