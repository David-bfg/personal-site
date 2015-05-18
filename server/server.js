Meteor.startup(function () {
    return Meteor.methods({
      clearMastermind: function() {
        return MastermindGuesses.remove({});
      }
    });
});
