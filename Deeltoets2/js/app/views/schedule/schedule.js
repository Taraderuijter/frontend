// define schedule view
FRISB.ScheduleView = Backbone.View.extend({
    el: $("#schedule"),

    initialize: function () {
         
        this.collection = new FRISB.Schedule(); 
	
	// Attach eventhandlers to collection
        this.collection.on("reset", this.render, this);
    },
        
    // Attach event handlers to view elements
    events: {
    
    },
    
    prepareRender: function() {
    	var self = this;
	 // Fetch data from the API, this is a "GET" request
	this.collection.fetch({
	// If the request succeeds, the success callback function is executed 
	    success: function(data) {
		FRISB.scheduleData = []; //array wordt weer leeggemaakt
		 // Loop through the fetched models 
		_.each(self.collection.models, function(model){
		   model.url = model.get("resource_uri");
	    
		    var setObject = {
			id: model.get("id"),
			start_time : model.get("start_time"),
			team_1_name: model.get("team_1").name,
			team_1_score: model.get("team_1_score"),
			team_2_name: model.get("team_2").name,												
			team_2_score : model.get("team_2_score")						
		    };				    
		    FRISB.scheduleData.push(setObject);
		});		        
		self.render(FRISB.scheduleData);
	    }
	});
    },
    
    render: function (data) {
        var self = this; //Binnen de functie, slaan we een verwijzing naar de View, zodat we binnen een callback functie kunnen komen (within the scope)        
        _.each(data, function (item) { //met each kunnen we elke model herhalen over onze collectie  	
            self.renderSchedule(item); //aldoor wordt de renderGame aangeroepen
        }, this);
    },

    renderSchedule: function (item) {
        var gameScheduleView = new FRISB.GameScheduleView({
            model: item
        });
        $("#games").append(gameScheduleView.render().el);
    }
});

var scheduleView = new FRISB.ScheduleView();