var Lives = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 生活";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        this.respond({params: params});
    };
};



exports.Lives = Lives;