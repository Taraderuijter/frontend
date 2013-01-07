// define individual game view
FRISB.GameView = Backbone.View.extend({
    tagName: "tr",
    template: $("#gameTemplate").html(),
    
    initialize: function(){
        
    },
    
    // Attach event handler 
    events: {
	    "click a.delete": "deleteGame"
    },
    
    // Delete game model
    deleteGame: function (e) {
	e.preventDefault();

	var removedTeam = this.model.get("team1");
        var removedTeam2 = this.model.get("team2");

	this.model.destroy();
	this.remove();

	if (_.indexOf(FRISB.games.getTeams(), removedTeam) === -1) {
          FRISB.games.$el.find("#filter select").children("[value='" + removedTeam.toLowerCase() + "']").remove();
        }
	if (_.indexOf(FRISB.games.getTeams(), removedTeam2) === -1) {
          FRISB.games.$el.find("#filter select").children("[value='" + removedTeam2.toLowerCase() + "']").remove();
        }
        
        console.log(removedTeam);
        console.log(removedTeam2);
        console.log(FRISB.games.getTeams());
        console.log(_.indexOf(FRISB.games.getTeams(), removedTeam));
    },

    render: function () {
        var tmpl = _.template(this.template);   
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});