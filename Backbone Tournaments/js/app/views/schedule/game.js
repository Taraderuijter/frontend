// define individual game view
FRISB.GameView = Backbone.View.extend({
    tagName: "tr",
    template: $("#gameTemplate").html(),
    
    initialize: function(){
        
    },

    render: function () {
        var tmpl = _.template(this.template);
        
        $(this.el).html(tmpl(this.model.toJSON()));
        return this;
    }
});