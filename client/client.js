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
  }
});

Template.navbar.events({
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
  mastermindThumbnail: [
        {pegs:[{color: "yellow", x: 0, y: 0}, {color: "green", x: 50, y: 0},
          {color: "red", x: 100, y: 0}, {color: "blue", x: 150, y: 0}]},
        {pegs:[{color: "green", x: 0, y: 50}, {color: "yellow", x: 50, y: 50},
          {color: "blue", x: 100, y: 50}, {color: "blue", x: 150, y: 50}]},
        {pegs:[{color: "red", x: 0, y: 100}, {color: "blue", x: 50, y: 100},
          {color: "red", x: 100, y: 100}, {color: "yellow", x: 150, y: 100}]},
        {pegs:[{color: "green", x: 0, y: 150}, {color: "blue", x: 50, y: 150},
          {color: "green", x: 100, y: 150}, {color: "yellow", x: 150, y: 150}]}]
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

Template.mastermind.helpers({
  guesses: function () {
    return MastermindGuesses.find({});
  }
});

Template.mastermind.helpers({
  mastermindColors: [
      {color: "red"}, {color: "green"}, {color: "orange"}, {color: "magenta"},
      {color: "blue"}, {color: "yellow"}, {color: "brown"}, {color: "purple"}]
});

Template.mastermind.helpers({
  mastermindCurrentGuess: function () {
    var guess = Session.get("mastermindGuess");
    return[
      {color: guess[0], index: 0}, {color: guess[1], index: 1},
      {color: guess[2], index: 2}, {color: guess[3], index: 3}]
  }
});

Template.navbar.events({
  "click .navbar-section": function (event) {
    $(".navbar-section").removeClass("active");
    $(event.currentTarget).addClass("active");
  }
});
