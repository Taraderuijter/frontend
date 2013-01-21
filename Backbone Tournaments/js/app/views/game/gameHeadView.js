// define tournaments view
FRISB.GameHeadView = Backbone.View.extend({
    el: $("#league"),
	
    initialize: function () {
		this.list = this.$el.find(".gameHeader");
        this.collection = new FRISB.Game(FRISB.gameData);

		this.render();	
    },
	
	// Render the view
    render: function () {
		this.$el.find(".gameHeader").html("");
	
		_.each(this.collection.models, function (item) {
        	this.renderHeader(item);
        }, this);
    },

    renderHeader: function (item) {
        var headView = new FRISB.HeaderView({
            model: item
        });

        this.list.append(headView.render().el);
    }
	
});


//create instance of master view
FRISB.gameHeader = new FRISB.GameHeadView();