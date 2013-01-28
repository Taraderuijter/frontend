// define individual set view
FRISB.SetView = Backbone.View.extend({
    tagName: "tr",
    template: $("#setTemplate").html(),
	
    // Render view
    render: function () {
        var tmpl = _.template(this.template);;
        this.$el.html(tmpl(this.model)).fadeIn(200);
        return this;
    }
});