word-mine
=========

Mine text from a string or file and get key words

##Example

There are a few [examples](example/) available.

```javascript
var mine = require('word-mine');

mine.parseText('three three three two two one', { order: true }, function(err, stats) {
  if(err) throw err;

  console.log(stats); // {'0': { 'three': 3}, '1': { 'two': 2 }, '2': { 'one' : 1 } }

});
```

##Usage
options is an optional object to set order true || false

###mine#parseText(text, options, callback)
```javascript
mine.parseText('How much wood would a wood chuck chuck', callback)
```
###mine#parseFiles(files[,...], options, callback)
files can be a single file string or an array of strings, to represent multiple files.
text from all files is concated into one large string and then parsed as a whole.
```javascript
mine.parseFiles(['woodchuck1.txt', 'woodchuck2.txt'], callback)
```
##License
MIT