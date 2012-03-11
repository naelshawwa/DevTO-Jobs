
define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var Navigation = namespace.module();

  // Navigation extendings
  Navigation.Model = Backbone.Model.extend({ 
    defaults: {
      label: "",
      url: ""
    }
  });

  Navigation.Collection = Backbone.Collection.extend({ 
    model:Navigation.Model 
  });

  // This will fetch the tutorial template and render it.
  Navigation.Views.Primary = Backbone.View.extend({
    template: "app/templates/navigation.html",

    model: new Navigation.Model,

    initialize: function() {

    },

    render: function(done) {
      var view = this;
      // Fetch the template, render it to the View element and call done.
      namespace.fetchTemplate(this.template, function(tmpl) {
        var collection = new Navigation.Collection;
        collection.add({"label":"Home", "url":""});
        collection.add({"label":"Register", "url":"/user/"});
        collection.add({"label":"Jobs", "url":"/jobs/"});

        view.el.innerHTML = tmpl({navItems:collection});

        // If a done function is passed, call it with the element
        if (_.isFunction(done)) {
          done(view.el);
        }
      });
    }
  });

  // Required, return the module for AMD compliance
  return Navigation;

});
