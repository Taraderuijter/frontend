// define ranking view
FRISB.PoolView = Backbone.View.extend({
    el: $("#ranking"),
	
    initialize: function () {
        this.collection = new FRISB.Pool(); 	
		
	// Attach eventhandlers to collection
        this.collection.on("reset", this.render, this);
    },
    
    prepareRender: function() {
    	var self = this;
	 // Fetch data from the API, this is a "GET" request
	this.collection.fetch({
	// If the request succeeds, the success callback function is executed 
	    success: function(data) {
		FRISB.poolData = []; //array wordt weer leeggemaakt
		 // Loop through the fetched models 
		_.each(self.collection.models, function(model){    
		    var setObject = {
			team: model.get("team").name,
			wins : model.get("wins"),
			losses: model.get("losses"),								            
			points_scored : model.get("points_scored"),											
			points_allowed : model.get("points_allowed")						
		    };
		    console.log(setObject);			
						
		    FRISB.poolData.push(setObject);
		});

		self.render(FRISB.poolData);
		self.accordion();
	    }
	});
    },
    
    render: function (data) {
        var self = this; //Binnen de functie, slaan we een verwijzing naar de View     
        _.each(data, function (item) { //met each kunnen we elke model herhalen over onze collectie  	
	    self.renderPool(item); //aldoor wordt de renderPool aangeroepen
        }, this);
    },

    renderPool: function (item) {
        var teamView = new FRISB.TeamView({
            model: item
        });
	
	$("#pool").append(teamView.render().el);
    },
    
    accordion: function () {
	$("#pool").accordion({
	    collapsible: true,
	    active: false
	});
    }
});

var poolView = new FRISB.PoolView();
