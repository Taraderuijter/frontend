// Define FED2 namespace
var FRISB = FRISB || {};

// # Define Game model #
	FRISB.Team = Backbone.Model.extend({
		// Set model defaults *(backbone method)*
		defaults: {
			"team": "unknown",
			"Win":"0",
			"Lost":"0",
			"Sw":"0",
			"Sl":"0",
			"Pw":"0",
			"Pl":"0"
		},
		
		// Initialize model *(backbone method)*
		initialize: function () {
			this.logMessage("Team model initialized");
		},
		
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
	});