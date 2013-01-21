// Define Set model
FRISB.GameSet = Backbone.Model.extend({
	// Set model defaults 
	defaults: {
			"set":"0",
			"team1":"unknown",
			"team2":"unknown",
			"team1Score":"0",
			"team2Score":"0",
			"team1End":"0",
			"team2End":"0"
	}
});