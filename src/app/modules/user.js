
define([
  "namespace",

  // Libs
  "use!backbone",

  // Modules
  "modules/navigation"
  // Plugins
],

function(namespace, Backbone, Navigation) {

  // Create a new module
  var User = namespace.module();

  // User extendings
  User.Model = Backbone.Model.extend({ /* ... */ });
  User.Collection = Backbone.Collection.extend({ /* ... */ });
  User.Router = Backbone.Router.extend({ 
    routes: {
      "/user/": "user",
      "/user/create":"create"
    },
    user: function(hash) {
    	 console.log("user index");
      var user = new User.Views.Single();
      var navigation = new Navigation.Views.Primary();

      console.log(user);
      navigation.render(function(el) {
        $("#navigation").html(el);
      });

      user.render(function(el) {
        $("#main").html(el);
      });
    },
    create: function(hash) {
    	 console.log("user create");
      var user = new User.Views.Create();
      var navigation = new Navigation.Views.Primary();

      navigation.render(function(el) {
        $("#navigation").html(el);
      });

      user.render(function(el) {
        $("#main").html(el);
      });
    }
  });

  // This will fetch the tutorial template and render it.
  User.Views.Single = Backbone.View.extend({
    template: "/app/templates/user.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // This will fetch the tutorial template and render it.
  User.Views.Create = Backbone.View.extend({
    template: "app/templates/create_user.html",

    render: function(done) {
      var view = this;

      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        view.el.innerHTML = tmpl();

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return User;

});
