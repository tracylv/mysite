var Win8 = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - WIN8";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        this.respond({params: params}, {template: 'app/views/win8/index'});
    };
};



exports.Win8 = Win8;