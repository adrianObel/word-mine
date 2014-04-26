var Mine = function() {

  function Mine() {
    this.dict = {};
    this.order = [];
  }

  var search = Mine.prototype;

  search.mineFile = function(files, callback) {

    if(typeof files === 'string') {
      files = [files];
    }

    this._mineFile(files, callback);

  };

  search._mineFile = function(files, callback, i, bigData) {

    if(!i) {
      i = 0; 
    }

    if(bigData) {
      bigData += bigData;
    }

    fs.readFile(files[i], 'utf8', function(err, data) {
    
      if(err) {
        console.log(err);
      }

      if(i < files.length - 1) {
        return mine(files, callback, ++i, data);
      }

      bigData += data;

      return callback(bigData);

    });

  };

  return Mine;

})();

exports = module.exports = new Mine();