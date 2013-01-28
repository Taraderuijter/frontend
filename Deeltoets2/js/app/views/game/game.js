// define game view
FRISB.GameView = Backbone.View.extend({
    el: $("body"),
	
    initialize: function () {
	this.collection = new FRISB.Game(); 
	
	this.collection.on("add", this.renderGame, this);	
        this.collection.on("reset", this.render, this);
    },
    
    events: {
	"click #add": "addSet",
	"click #cancel": "showForm",
	"click #showForm": "showForm"	
    },
    
    prepareRender: function(id) {
	console.log(id);
    	var self = this;
	 // Fetch data from the API, this is a "GET" request
	this.collection.fetch({
	// If the request succeeds, the success callback function is executed 
	    success: function(data) {
		FRISB.gameData = []; //array wordt weer leeggemaakt
		 // Loop through the fetched models 
		_.each(self.collection.models, function(model){
						
			model.number = model.get('number');		            			
			model.team_1_score = model.get('team_1_score');
			model.team_2_score = model.get('team_2_score');
						
			var setObject = {
			    set : model.number,
			    team1:"Beat the Polls",								            
			    team_1_score : model.team_1_score,
			    team2:"Reload",												
			    team_2_score : model.team_2_score						
			};
						
			FRISB.gameData.push(setObject);
		});      
	    self.render(FRISB.gameData);
	    }
	});
    },
    
    render: function (data) {
        var self = this; //Binnen de functie, slaan we een verwijzing naar de View, zodat we binnen een callback functie kunnen komen (within the scope)        
        _.each(data, function (item) { //met each kunnen we elke model herhalen over onze collectie  	
            self.renderGame(item); //aldoor wordt de renderGame aangeroepen
        }, this);
    },

    renderGame: function (item) {
        var setView = new FRISB.SetView({
            model: item
        });

        $("#sets").append(setView.render().el);
    },
    
    // Add game model
    addSet: function (e) {
	e.preventDefault();
	var newModel = {};
	$("#addSet").children("input").each(function (i, el) {
	    if ($(el).val() !== "") {
	        newModel[el.id] = $(el).val();
	    }
	});
	newModel["set"] = this.collection.models.length + 1;
	newModel["team1"] = "Beat the Polls";
	newModel["team2"] = "Reload";
	
	FRISB.gameData.push(newModel);
	
	//this.addNewSet();

	this.collection.add(new FRISB.GameSet(newModel));

	this.collection.reset(FRISB.gameData);
	
	this.$el.find("#addSet").slideToggle();
    },
    
    // Add a new set
    addNewSet: function() {
        // New set data
        var set = {
            number: this.collection.models.length + 1,
            team_1_score: '1',
            team_2_score: '2',
        }
        
        // Instantiate a new model and stored it in the variable "newModel"
        // Pass the data to the new model as a parameter
        var newModel = new FRISB.GameSet(set);

        // Set the API url
        newModel.url = FRISB.config.api_url;
        
        // Save a new model to the API, this is a "POST" request
        // the save function takes two parameters,
        
        newModel.save(
            // The first parameter is the data object
            newModel.toJSON(), {
                // The second parameter takes request options
                success: function(data) {
                    // On succes set the new url for the model
                    newModel.url = newModel.get('resource_uri');
                },
                error: function(data) {
                    // On error log the error in the console
                    console.log('error');
                },
                // Define an authorization header to allow for posting to the API
                headers: {
                    Authorization: 'bearer '+FRISB.config.access_token
                }
            }
        );
    },

    showForm: function (e) {
	e.preventDefault();
	this.$el.find("#addSet").fadeToggle();
    }
});

var gameView = new FRISB.GameView();
