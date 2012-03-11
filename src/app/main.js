//nael
require([
  "namespace",

  // Libs
  "jquery",
  "use!backbone",

  // Modules
  "modules/example",
  "modules/user",
  "modules/index",
  "modules/navigation",
  "modules/job"
],

function(namespace, jQuery, Backbone, Example, User, Index, Navigation, Job) {

  // Defining the application router, you can attach sub routers here.
  var Router = Backbone.Router.extend({
    routes: {
     "": "index",
      ":hash": "index",
      "/job": "index"
    },
    initialize: function(){
    	 this.UserRouter = new User.Router();
    	 this.JobRouter = new Job.Router();
    },
    index: function(hash) {
    	console.log("Main index");
      var route = this;
      var index = new Index.Views.Index();
      var navigation = new Navigation.Views.Primary();

      navigation.render(function(el) {
    	  console.log("navigation render");
    	  console.log(el);
        $("#navigation").html(el);
      });

      index.render(function(el) {
    	  console.log("index render");
    	  console.log(el);
        $("#main").html(el);
      });
    }
  });

  // Shorthand the application namespace
  var app = namespace.jobboard;

  // Treat the jQuery ready function as the entry point to the application.
  // knside this function, kick-off all initialization, everything up to this
  // point should be definitions.
  jQuery(function($) {
    // Define your master router on the application namespace and trigger all
    // navigation from this instance.
	  
	
	
    app.router = new Router();
  
   
    // Trigger the initial route and enable HTML5 History API support
    Backbone.history.start({ pushState: true });
  });

  // All navigation that is relative should be passed through the navigate
  // method, to be processed by the router.  If the link has a data-bypass
  // attribute, bypass the delegation completely.
  $(document).on("click", "a:not([data-bypass])", function(evt) {
    // Get the anchor href and protcol
    var href = $(this).attr("href");
    var protocol = this.protocol + "//";

    // Ensure the protocol is not part of URL, meaning its relative.
    if (href && href.slice(0, protocol.length) !== protocol &&
        href.indexOf("javascript:") !== 0) {
      // Stop the default event to ensure the link will not cause a page
      // refresh.
      evt.preventDefault();

      // This uses the default router defined above, and not any routers
      // that may be placed in modules.  To have this work globally (at the
      // cost of losing all route events) you can change the following line
      // to: Backbone.history.navigate(href, true);
      app.router.navigate(href, true);
     
     
    }
  });

});
