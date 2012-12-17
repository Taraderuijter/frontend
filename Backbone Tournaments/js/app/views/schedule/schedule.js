// define schedule view
FRISB.ScheduleView = Backbone.View.extend({
    el: $("#schedule"),

    initialize: function () {
        this.collection = new FRISB.Schedule(FRISB.scheduleData);
        this.render();
    },

    render: function () {
        var that = this;

        _.each(this.collection.models, function (item) {
            that.renderGame(item);
        }, this);
    },

    renderGame: function (item) {
        var gameView = new FRISB.GameView({
            model: item
        });
        this.$el.append(gameView.render().el);
    }
});