var Basketballs = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - NBA";
    geddy.viewHelpers.menu_data.active_tab = "basketball";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.before(geddy.viewHelpers.requireAuth, { only: ['index'] });

    this.index = function (req, resp, params) {
        this.respond({params: params});
    };
};



exports.Basketballs = Basketballs;