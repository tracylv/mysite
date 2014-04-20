var Advices = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 意见与建议";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        this.respond({params: params});
    };
};



exports.Advices = Advices;