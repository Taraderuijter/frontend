// define individual tournament view
FRISB.SetView = Backbone.View.extend({
    tagName: "tr",
    template: $("#tournamentTemplate").html(),
	
	// Attach event handler to view elements
	events: {
	    "click a.delete": "deleteSet"
	},
	
	// Delete tournament model
	deleteSet: function (e) {
		e.preventDefault();
	    
		var removedType = this.model.get("team1").toLowerCase();
	    
		this.model.destroy();
	    this.remove();
	    
		if (_.indexOf(FRISB.league.getTypes(), removedType) === -1) {
	        FRISB.league.$el.find("#filter select").children("[value='" + removedType + "']").remove();
	    }
	},
	
	// Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});