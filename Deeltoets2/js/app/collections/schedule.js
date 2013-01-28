FRISB.config = {
    tournamentID: 18590,
    access_token: '109f8a19ae',
    api_url: 'https://api.leaguevine.com/v1/games/?pool_id=18744',
    season_id: '20126',
    pool_id: '18744'
} 

// # Define schedule collection #
FRISB.Schedule = Backbone.Collection.extend({
// Specifiy model for this collection
    model: FRISB.Game,
    
    comparator: function(game) {
	return game.get("start_time");
    },
    
    // Set the url for the collection
    url: FRISB.config.api_url,
	    
    //url: FRISB.config.api_url2,
	
    // Parse the relevant data from the data object
    parse: function(data) {
	return data.objects;
    }
});