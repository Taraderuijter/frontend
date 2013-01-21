// define individual tournament view
FRISB.HeaderView = Backbone.View.extend({
    tagName: "h1",
    template: $("#gameHead").html(),
	
	// Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model.toJSON()));
        return this;
    }
});