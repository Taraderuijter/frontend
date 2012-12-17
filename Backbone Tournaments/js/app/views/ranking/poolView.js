// # Define game view #
	FRISB.PoolView = Backbone.View.extend({
		// Define element (this.el)     
		el: $("#pool"),
		
		// Initialize view *(backbone method)*
	    initialize: function () {
			this.logMessage("Pool view initialized");
	        
			// Specify collection for this view
			this.collection = new FRISB.Pool(FRISB.poolData);
			
			// Render view
	        this.render();
			
	    },
		
		// Render view *(backbone method)*
	    render: function () {
	        var self = this;

	        _.each(this.collection.models, function (item) {
	            self.renderPool(item);
	        }, this);
	    },
		
		// Render game *(custom method)*
	    renderPool: function (item) {
			// Create new instance of SetView
			var teamView = new FRISB.TeamView({
	            model: item
	        });
	
			// Append the rendered HTML to the views element
	        this.$el.append(teamView.render().el);
	    },
	
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
		
	});