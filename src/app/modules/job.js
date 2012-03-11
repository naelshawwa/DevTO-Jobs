
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
	var Job = namespace.module();

	// Job extendings
	Job.Model = Backbone.Model.extend({ /* ... */ });
	Job.Collection = Backbone.Collection.extend({ /* ... */ });
	
	
	var listings = new Job.Collection();
	listings.add({	"id"	: 	1,
					"name"	: 	"DevTO is hiring an intern!"
	});
	listings.add({	"id"	:	2,
					"name" 	: 	"DevTO hiring 1000 developers!"
	});
	
	
	Job.Router = Backbone.Router.extend({ 
		routes: {
			"/jobs/:id": "view",
			"/jobs/":	"listing",
			"/jobs/new": "add"
		},
		view: function(hash) {
			console.log("view a job: " + hash);
			var job = new Job.Views.Single({id: hash, listings: listings});
			var navigation = new Navigation.Views.Primary();


			navigation.render(function(el) {
				$("#navigation").html(el);
			});

			job.render(function(el) {
				console.log("job render");
				$("#main").html(el);
			});
		},
		add: function(hash) {
			console.log("create a job");
			var job = new Job.Views.Add({listings: listings});
			var navigation = new Navigation.Views.Primary();


			navigation.render(function(el) {
				$("#navigation").html(el);
			});

			job.render(function(el) {
				console.log("job render");
				$("#main").html(el);
			});
		},
		listing: function(){
			console.log("view job listings");
			
			var job = new Job.Views.Listing({listings: listings});
			var navigation = new Navigation.Views.Primary();


			navigation.render(function(el) {
				$("#navigation").html(el);
			});

			job.render(function(el) {
				console.log("job listing render");
				$("#main").html(el);
			});
		}
	});

	// This will fetch the tutorial template and render it.
	Job.Views.Single = Backbone.View.extend({
		template: "/app/templates/job/profile.html",
		initialize: function(args){
			console.log("initialize single job view")
			_.extend(this, args);
		},
		render: function(done) {
			var view = this;
			
			console.log("Render");
			console.log(view);
			
			// Fetch the template, render it to the View element and call done.
			namespace.fetchTemplate(this.template, function(tmpl) {
				console.log(view);
				view.el.innerHTML = tmpl(view);

				// If a done function is passed, call it with the element
				if (_.isFunction(done)) {
					done(view.el);
				}
			});
		}
	});
	
	Job.Views.Listing = Backbone.View.extend({
		template: "/app/templates/job/list.html",
		initialize: function(args){
			console.log("initialize  job listing view");
			_.extend(this, args);
			console.log(args);
		},
		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			namespace.fetchTemplate(this.template, function(tmpl) {
				
				console.log("View listing render");
				console.log(view);
				view.el.innerHTML = tmpl(view);

				// If a done function is passed, call it with the element
				if (_.isFunction(done)) {
					done(view.el);
				}
			});
		}
	});
	
	Job.Views.Add = Backbone.View.extend({
		template: "/app/templates/job/add.html",
		initialize: function(args){
			console.log("initialize  job add view");
			_.extend(this, args);
			console.log(args);
		},
		render: function(done) {
			var view = this;

			// Fetch the template, render it to the View element and call done.
			namespace.fetchTemplate(this.template, function(tmpl) {
				
				console.log("View listing render");
				console.log(view);
				view.el.innerHTML = tmpl(view);

				// If a done function is passed, call it with the element
				if (_.isFunction(done)) {
					done(view.el);
				}
			});
		}
	});




	// Required, return the module for AMD compliance
	return Job;

});
