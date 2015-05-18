Router.configure({
  layoutTemplate: "layout"
});
Router.route("/", "main");
Router.route("/aboutme");
Router.route("/projects");
Router.route("/mooburr");

Session.set("selectedAboutMe", "interests");

Session.set("selectedProject", "unselected");

Session.set("mastermindGuess", ["red", "red", "red", "red"]);

Template.navbar.events({
  "click .brand": function (event) {
    $(".navbar-section").removeClass("active");
  },
  "click .navbar-section": function (event) {
    $(".navbar-section").removeClass("active");
    $(event.currentTarget).addClass("active");
  }
});

Template.sidebar.events({
  "click .list-group-item": function (event) {
    $(".list-group-item").removeClass("active");
    $(event.currentTarget).addClass("active");
    Session.set("selectedAboutMe", $(".list-group-item.active").attr("id"));
  }
});

Template.aboutme.helpers({
  selectedAboutMe: function () {
    switch(Session.get("selectedAboutMe")){
      case "cvleter":
        return Template.coverleter;
      case "resume":
        return Template.resume;
      default:
        return Template.interests;
    }
  }
});

Template.selectproject.events({
  "click .thumbnail": function (event) {
    $(".thumbnail").removeClass("active").css( "background-color", "white" );
    $(event.currentTarget).addClass("active").css( "background-color", "#ccc");
    Session.set("selectedProject", $(".thumbnail.active").attr("id"));
  }
});

Template.selectproject.helpers({
  mastermindThumbnail: function () {
    var thumbnail = [
      {pegs:[{color: "yellow"}, {color: "green"}, {color: "red"}, {color: "blue"}]},
      {pegs:[{color: "green"}, {color: "yellow"}, {color: "blue"}, {color: "blue"}]},
      {pegs:[{color: "red"}, {color: "blue"}, {color: "red"}, {color: "yellow"}]},
      {pegs:[{color: "green"}, {color: "blue"}, {color: "green"}, {color: "yellow"}]}
    ];

    for(var y =0; y <4; y++){
      for(var x =0; x <4; x++){
        thumbnail[y].pegs[x].x = x * 50;
        thumbnail[y].pegs[x].y = y * 50;
      }
    }

    return thumbnail;
  }
});

Template.projects.helpers({
  project: function () {
    switch(Session.get("selectedProject")){
      case "elevatorsaga":
        return Template.elevatorsaga;
      case "mastermind":
        return Template.mastermind;
      default:
        return Template.projecthome;
    }
  }
});

var colors = [
  "red", "green", "orange", "magenta", "blue", "yellow", "brown", "purple"
];

Template.mastermind.helpers({
  guesses: function () {
    return MastermindGuesses.find({});
  },
  isSolved: function () {
    return MastermindGuesses.find({bulls: 4}).count();
  },
  mastermindColors: [
    {color: colors[0]}, {color: colors[1]}, {color: colors[2]}, {color: colors[3]},
    {color: colors[4]}, {color: colors[5]}, {color: colors[6]}, {color: colors[7]}
  ],
  mastermindCurrentGuess: function () {
    var guess = Session.get("mastermindGuess");
    return[
      {color: guess[0], index: 0}, {color: guess[1], index: 1},
      {color: guess[2], index: 2}, {color: guess[3], index: 3}]
  }
});

var bulls = function (guess, solution) {
  var bulls = 0;
  for(var x = 0; x < 4; x++){
    if(guess[x] == solution[x]){bulls++;}
  }
  return bulls;
};

var bullsPlusCows = function (guess, solution) {
  var bullsPlusCows = 0;
  for(var x = 0; x < 4; x++){
    var index = solution.indexOf(guess[x]);
    if(-1 != index){
      bullsPlusCows++;
      solution.splice(index, 1);
    }
  }
  return bullsPlusCows;
};

Template.mastermind.events({
  "click .dropdown-menu li": function (event) {
    var $target = $(event.currentTarget);
    var id = $target.closest(".dropdown-menu").attr("aria-labelledby");
    var guess = Session.get("mastermindGuess");

    id = id.substr(id.length - 1);
    guess[id] = $target.attr("value");
    Session.set("mastermindGuess", guess);
  },
  "click #submit": function (event) {
    var guess = Session.get("mastermindGuess");
    var dbGuess = {pegs:[{},{},{},{}]};

    for(var x = 0; x < 4; x++){
      dbGuess.pegs[x].color = guess[x];
    }

    var solution = MastermindSolution.find({}).fetch()[0].solution;

    dbGuess.bulls = bulls(guess, solution);
    dbGuess.cows = bullsPlusCows(guess, solution) - dbGuess.bulls;
    MastermindGuesses.insert(dbGuess);
  },
  "click #new-game": function (event) {
    Meteor.call("clearMastermind");
    var id = MastermindSolution.find({}).fetch()[0]._id;
    var solution = [];

    for(var x = 0; x < 4; x++){
      solution.push(colors[Math.floor(Math.random() * colors.length)]);
    }
    MastermindSolution.update({_id: id}, {solution: solution});
  }
});
