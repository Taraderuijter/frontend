// define tournament model
FRISB.Team = Backbone.Model.extend({
    defaults: {
        "team": "unknown",
	"wins":"?",
	"losses":"?",
	"points_scored":"?",
	"points_allowed":"?"
    }
});