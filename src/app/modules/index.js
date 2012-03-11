
define([
  "namespace",

  // Libs
  "use!backbone"

  // Modules

  // Plugins
],

function(namespace, Backbone) {

  // Create a new module
  var Index = namespace.module();

  // Index extendings
  Index.Model = Backbone.Model.extend({ /* ... */ });
  Index.Collection = Backbone.Collection.extend({ /* ... */ });
  Index.Router = Backbone.Router.extend({ /* ... */ });

  // This will fetch the tutorial template and render it.
  Index.Views.Index = Backbone.View.extend({
    template: "/app/templates/index.html",

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
  return Index;

});
