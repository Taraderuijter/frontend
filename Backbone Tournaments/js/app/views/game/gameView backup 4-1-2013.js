	var team1End =0; 
	var team2End =0; 
	var winner = "No winner"; 
	var team1 = "Not defined"; 
	var team2 = "Not defined"; 
	
// # Define GameView view #
	FRISB.GameView = Backbone.View.extend({
	// Define element (this.el)     
	el: $("#setScore"),	

	// Initialize view
    initialize: function () {
		this.collection = new FRISB.GameResult(FRISB.gameData);
        this.render();
    },

	// Render view
    render: function () {
      var self = this;
		_.each(this.collection.models, function (item) {
        self.renderGame(item);
        }, this);
    },

	// Render schedule
	
    renderGame: function (item) {
		// Create new instance of GameView
		var setView = new FRISB.SetView({
            model: item
        });
		
		var team1Score = item.attributes.team1Score;
		var team2Score = item.attributes.team2Score;
		team1 =  item.attributes.team1;
		
		team2 =  item.attributes.team2;
		
		
		if  (team1Score >  team2Score){
			team1End++;

		}
		else { team2End++;} 
		
		// Append the rendered HTML to the views element
        this.$el.append(setView.render().el);
    }
	
});
	
	if  (team1End == team2End){
			winner = team1; }
	else {winner = team2; }
	console.log(team1End);
	console.log(winner);

// Kickstart the application by creating an instance of LeagueView
FRISB.schedule = new FRISB.GameView();
//var schedule = new FRISB.GameView();