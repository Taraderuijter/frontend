// Namespace
var FRISB = FRISB || {};

// define game model
FRISB.Game = Backbone.Model.extend({
    defaults: {
        "date": "Date name unknown",
	"team1":"unknown",
	"team1Score": "unknown",
	"team2": "unknown",
	"team2Score": "unknown"
    },
    
    initialize: function (){
	
    }
});