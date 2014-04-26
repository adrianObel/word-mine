var mine = require('../');

mine.parseFile('example/bank.txt', function(err, stats) {

  if(err) {
    console.log(err);
  }

  console.log(stats);
  
});
