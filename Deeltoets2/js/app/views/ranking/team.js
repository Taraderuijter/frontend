// define individual Team view
FRISB.TeamView = Backbone.View.extend({
    tagName: "li",
    template: $("#teamTemplate").html(),
	
    // Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model)).fadeIn(200);
        return this;
    }
});