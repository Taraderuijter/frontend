FRISB.config = {
    tournamentID: 18590,
    access_token: '109f8a19ae',
    api_url: 'https://api.leaguevine.com/v1/game_scores/?game_id=88502',
    season_id: '20126'
} 

// # Define GameResult collection #
FRISB.Game = Backbone.Collection.extend({
	// Specifiy model for this collection
	model: FRISB.GameSet,
		
	comparator : function(game) {
		return game.get("set");
	},
	
	// Set the url for the collection
	url: FRISB.config.api_url,
	
	// Parse the relevant data from the data object
	parse: function(data) {
		return data.objects[0].game_sets;
	}
});