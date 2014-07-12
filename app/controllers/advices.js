var Advices = function () {

    geddy.viewHelpers.page_info.page_title = "TracyLv - 意见与建议";
    geddy.viewHelpers.menu_data.active_tab = "advice";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.before(geddy.viewHelpers.requireAuth(null), { only: ['index'] });

    this.index = function (req, resp, params) {
        this.respond({params: params});
    };
};



exports.Advices = Advices;