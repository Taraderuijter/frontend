// # Define GameResult collection #
	FRISB.Game = Backbone.Collection.extend({
		  // Specifiy model for this collection
		model: FRISB.GameSet,
		
			comparator : function(game) {
		return game.get("team1");
	}

	
	});