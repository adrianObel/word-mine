var fs = require('fs');

var Mine = (function() {

  function Mine() {
    this.dict = {};
    this.order = [];
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

      self.dict[word] = self.dict[word] 
      ? ++self.dict[word]
      : 1;

    });

    delete this.dict['']; // Remove empty space

    callback = arguments.length === 2
      ? options
      : callback;

    return callback(this.dict);

  };

  search.parseFile = function(files, options, callback) {

    if(typeof files === 'string') {
      files = [files];
    }

    callback = arguments.length === 2
      ? options
      : callback;

    this._mineFile(files, callback);

  };

  search._mineFile = function(files, callback, i, bigData) {

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
        return self._mineFile(files, callback, ++i, data);
      }

      bigData += data;

      return self.parseText(bigData, callback);

    });

  };

  return Mine;

})();

exports = module.exports = new Mine();