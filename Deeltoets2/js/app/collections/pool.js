FRISB.config = {
    tournamentID: 18590,
    gameID: 88502,
    access_token: '109f8a19ae',
    api_url: 'https://api.leaguevine.com/v1/pools/?pool_ids=%5B18744%5D',
    season_id: '20126'
}

// define a ranking
FRISB.Pool = Backbone.Collection.extend({
    model: FRISB.Team,
	
    comparator : function(team) {
	return -(team.get("wins").toString() + team.get("points_scored").toString());
    },
    
    // Set the url for the collection
    url: FRISB.config.api_url,
	
    // Parse the relevant data from the data object
    parse: function(data) {
	return data.objects[0].standings;
    }
});