if (Meteor.isClient) {
  Router.configure({
    layoutTemplate: 'layout'
  });
  Router.route('/', 'main');
  Router.route('/aboutme');
  Router.route('/projects');
  Router.route('/mooburr');

  Session.set('selectedAboutMe', 'interests');

  Session.set('selectedProject', 'unselected');

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
      Session.set('selectedAboutMe', $(".list-group-item.active").attr('id'));
    }
  });

  Template.aboutme.helpers({
    "selectedAboutMe": function () {
      switch(Session.get('selectedAboutMe')){
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
      Session.set('selectedProject', $(".thumbnail.active").attr('id'));
    }
  });

  Template.projects.helpers({
    "project": function () {
      switch(Session.get('selectedProject')){
        case "elevatorsaga":
          return Template.elevatorsaga;
        default:
          return Template.projecthome;
      }
    }
  });
}
