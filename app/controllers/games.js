var Games = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 游戏";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.index = function (req, resp, params) {
        this.respond({params: params});
    };
};



exports.Games = Games;