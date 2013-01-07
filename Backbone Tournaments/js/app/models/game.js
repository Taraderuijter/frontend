// Namespace
var FRISB = FRISB || {};

// define game model
FRISB.Game = Backbone.Model.extend({
    defaults: {
        "date": "unknown",
	"team1":"unknown",
	"team1Score": "?",
	"team2": "unknown",
	"team2Score": "?"
    }
});