// define schedule view
FRISB.ScheduleView = Backbone.View.extend({
    el: $("#schedule"),

    initialize: function () {
        this.list = this.$el.find("#games");
        this.collection = new FRISB.Schedule(FRISB.scheduleData);
        this.render();
        
        this.$el.find("#filter").append(this.createSelect());

	// Attach custom event handler
	this.on("change:filterTeam", this.filterByTeam, this);

	// Attach eventhandlers to collection
        this.collection.on("reset", this.render, this);
	this.collection.on("add", this.renderSchedule, this);
	this.collection.on("remove", this.removeGame, this);
    },
    
    // Attach event handlers to view elements
    events: {
	"change #filter select": "setFilter",
	"click #add": "addGame",
	"click #showForm": "toggleForm",
        "click #cancel": "toggleForm",
    },

    render: function () {
        this.$el.find("#games").html("");

        _.each(this.collection.models, function (item) {
            this.renderSchedule(item);
        }, this);
    },

    renderSchedule: function (item) {
        var gameView = new FRISB.GameView({
            model: item
        });
        this.list.append(gameView.render().el);
    },
    
    // Add game model
    addGame: function (e) {
	e.preventDefault();
	var newModel = {};
	$("#addGame").children("input").each(function (i, el) {
	    //if ($(el).val() !== "") {
	        newModel[el.id] = $(el).val();
	    //}
	});
	FRISB.scheduleData.push(newModel);

	if (_.indexOf(this.getTeams(), newModel.team1) || _.indexOf(this.getTeams(), newModel.team2) === -1) {
	    this.collection.add(new FRISB.Game(newModel));
	    this.$el.find("#filter").find("select").remove().end().append(this.createSelect());
	} else {
	    this.collection.add(new FRISB.Game(newModel));
	}

	this.collection.reset(FRISB.scheduleData);
        
        // Hide form
        this.$el.find("#addGame").slideToggle();
        
        // Show message
        this.displayMessage("Successfully added");
    },
        
    // Remove game model
    removeGame: function (removedModel) {
        var removed = removedModel.attributes;
        _.each(FRISB.scheduleData, function (item) {
            if (_.isEqual(item, removed)) {
                FRISB.scheduleData.splice(_.indexOf(FRISB.scheduleData, item), 1);
            }
        });
        // Reset filter
        this.collection.reset(FRISB.scheduleData);
        $("#filter select").val("all").change();
        
        // Show message
        this.displayMessage("Successfully deleted");
    },
    
    // Get teams for select box
    getTeams: function () {
        var teams = _.union(this.collection.pluck("team1"), this.collection.pluck("team2"));
	return _.sortBy(teams, function (item) {
            return item.toLowerCase();
        });
    },
    
    // Create team select box
    createSelect: function () {
        var filter = this.$el.find("#filter"),
	select = $("<select/>", {
	    html: "<option value='all'>all</option>"
	});
	_.each(this.getTeams(), function (item) {
	    var option = $("<option/>", {
	        value: item.toLowerCase(),
	        text: item.toLowerCase()
	    }).appendTo(select);
	});
        return select;
    },
    
    // Set filter
    setFilter: function (e) {
	this.filterTeam = e.currentTarget.value;

	// Trigger custom event handler
	this.trigger("change:filterTeam");
        
        // Reset messagebox
        this.displayMessage("");
    },

    // Filter the collection
    filterByTeam: function () {
	if (this.filterTeam === "all") {
	    this.collection.reset(FRISB.scheduleData);
	} else {
	    this.collection.reset(FRISB.scheduleData, { silent: true });
	    var filterTeam = this.filterTeam,
	    filtered = _.filter(this.collection.models, function (item) {
	        return item.get("team1").toLowerCase() === filterTeam || item.get("team2").toLowerCase() === filterTeam;
	    });
	    this.collection.reset(filtered);
	}
    },

    // Toggle form
    toggleForm: function (e) {
	e.preventDefault();
	this.$el.find("#addGame").slideToggle();
    },
    
    // Display message 
    displayMessage: function(message) {
        var messageBox = this.$el.find("#message");
        messageBox.text(message);
    }
});