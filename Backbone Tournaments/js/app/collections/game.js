// # Define GameResult collection #
	FRISB.GameResult = Backbone.Collection.extend({
		  // Specifiy model for this collection
		model: FRISB.Set,
		
		// Initialize collection *(backbone method)*
		initialize: function () {
			this.logMessage("GameResult collection initialized");
		},
		
		// Log message *(custom method)*
		logMessage: function (message) {
			console.log(message);
		}
	});