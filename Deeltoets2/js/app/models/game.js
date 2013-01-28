// define game model
FRISB.Game = Backbone.Model.extend({
    defaults: {
	"id" : "?",
        "start_time": "unknown",
	"team_1_name":"unknown",
	"team_1_score": "?",
	"team_2_name": "unknown",
	"team_2_score": "?"
    }
});