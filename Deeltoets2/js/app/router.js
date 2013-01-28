var Router = Backbone.Router.extend({
	routes: {
		"ranking": "showRanking",
		"game/:id": "showGame",
		"*path": "home"   
	},
	home: function() {
		$('#container').html( $('#schedulePage').html() );
		scheduleView.prepareRender();
	},
	showRanking: function() {			 
		$('#container').html( $('#rankingPage').html() );
		poolView.prepareRender();
	},	
	showGame: function(id) {
		$('#container').html( $('#gamePage').html() );
		gameView.prepareRender(id);
	}
});

$(function(){
	var router = new Router();
	Backbone.history.start();
});

