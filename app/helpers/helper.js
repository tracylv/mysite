var page_info = {
    page_title : "个人网站",
    meta_keywords : "个人网站，生活，游戏，NBA，WIN8，交流",
    meta_description : "这是一个包含生活、游戏、NBA、WIN8、交流在内的个人网站",
    meta_author : "Tracy Lv"
};


var menu_data = {
    active_tab : "life",
    data : [{tab: "life", text: "我的生活", link: "/lives/index"},
            {tab: "game", text: "我的游戏", link: "/games/index"},
            {tab: "basketball", text: "我的NBA", link: "/basketballs/index"},
            {tab: "win8", text: "我的WIN8", link: "/win8/index"},
            {tab: "site", text: "网站定制", link: "/sites/index"},
            {tab: "advice", text: "意见与建议", link: "/advices/index"},
            {tab: "admin", text: "管理员入口", link: "/admins/category"}]
};


var session_obj = {
    username: "",
    userrole: ""
};





exports.page_info = page_info;
exports.menu_data = menu_data;
exports.session_obj = session_obj;