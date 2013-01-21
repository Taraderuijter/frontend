// define tournaments view
FRISB.GameView = Backbone.View.extend({
    el: $("#Game"),
	
    initialize: function () {
		this.list = this.$el.find(".tournaments");
        this.collection = new FRISB.Game(FRISB.gameData);
		this.render();	
		
		this.$el.find("#filter").append(this.createSelect());
		
		this.on("change:filterType", this.filterByType, this);
		
        this.collection.on("reset", this.render, this);
		this.collection.on("add", this.renderLeague, this);
		this.collection.on("remove", this.removeGameSet, this);
    },

	// Attach event handlers to view elements
	events: {
	    "change #filter select": "setFilter",
		"click #add": "addSet",
		"click #showForm": "showForm"
	},
	
	// Render the view
    render: function () {
		this.$el.find(".tournaments").html("");
	
		_.each(this.collection.models, function (item) {
        	this.renderLeague(item);
        }, this);
    },

    renderLeague: function (item) {
        var setView = new FRISB.SetView({
            model: item
        });

        this.list.append(setView.render().el);
    },
	
	// Add tournament model
	addSet: function (e) {
	    e.preventDefault();
	    var newModel = {};
	    $("#addTournament").children("select").each(function (i, el) {
	        if ($(el).val() !== "") {
	            newModel[el.id] = $(el).val();
	      }
	    });
		 $("#addTournament").children("input").each(function (i, el) {
	        if ($(el).val() !== "") {
	            newModel[el.id] = $(el).val();
	      }
	    });
	    FRISB.gameData.push(newModel);
	    
	    if (_.indexOf(this.getTypes(), newModel.set) === -1) {
	         this.collection.add(new FRISB.GameSet(newModel));
	        this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
	    } else {
	        this.collection.add(new FRISB.GameSet(newModel));
	    }
	  
	    this.collection.reset(FRISB.gameData);
	},
	
	//Remove tournament model
	removeGameSet: function (removedModel) {
	    var removed = removedModel.attributes;
	    _.each(FRISB.gameData, function (item) {
	        if (_.isEqual(item, removed)) {
	            FRISB.gameData.splice(_.indexOf(FRISB.gameData, item), 1);
	        }
	    });
	},

	// Get types for set select box
	getTypes: function () {
	    return _.uniq(this.collection.pluck("set"), false, function (type) {
	        return type.toLowerCase();
	    });
	},
	
	// Create set select box
	createSelect: function () {
	    var filter = this.$el.find("#filter"),
	        select = $("<select/>", {
	            html: "<option value='all'>all</option>"
	        });
	    _.each(this.getTypes(), function (item) {
	        var option = $("<option/>", {
	            value: item.toLowerCase(),
	            text: item.toLowerCase()
	        }).appendTo(select);
	    });
	    return select;
	}, 
	
	// Set filter
	setFilter: function (e) {
	    this.filterType = e.currentTarget.value;
	    
		// Trigger custom event handler
		this.trigger("change:filterType");
	},
	
	// Filter the collection
	filterByType: function () {
	    if (this.filterType === "all") {
	        this.collection.reset(FRISB.gameData);
	    } else {
	        this.collection.reset(FRISB.gameData, { silent: true });
	        var filterType = this.filterType,
	            filtered = _.filter(this.collection.models, function (item) {
	            return item.get("set").toLowerCase() === filterType;
	        });
	        this.collection.reset(filtered);
	    }
	}, 
	
	showForm: function (e) {
		e.preventDefault();
	    this.$el.find("#addTournament").slideToggle();
	}
});


//create instance of master view
var gameViewtest = new FRISB.GameView();
//FRISB.games = new FRISB.GameView();