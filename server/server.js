Meteor.startup(function () {
  if(0 == MastermindSolution.find({}).count()){
    var colors = [
      "red", "green", "orange", "magenta", "blue", "yellow", "brown", "purple"
    ];
    var solution = [];

    for(var x = 0; x < 4; x++){
      solution.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    MastermindSolution.insert({solution: solution});
  }
  
  return Meteor.methods({
    clearMastermind: function() {
      return MastermindGuesses.remove({});
    }
  });
});
