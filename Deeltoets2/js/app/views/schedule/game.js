// define individual game view
FRISB.GameScheduleView = Backbone.View.extend({
    tagName: "tr",
    template: $("#gameTemplate").html(),
      
    // Render view       
    render: function () {
        var tmpl = _.template(this.template);   
        $(this.el).html(tmpl(this.model)).fadeIn(200);
        return this;
    }
});