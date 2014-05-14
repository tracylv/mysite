
var Settings = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 个人信息";
    geddy.viewHelpers.menu_data.active_tab = "admin";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.before(geddy.viewHelpers.requireAuth(geddy.model.User.userrole.user), { only: ['profile', 'profile_post'] });

    this.profile = function (req, resp, params) {
        var self = this;
        var userid = self.session.get("userid");

        geddy.model.User.first(userid, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new geddy.errors.NotFoundError();
            }
            else {
                self.respondWith(user);
            }
        });
    };

    this.profile_post = function (req, resp, params) {
        var self = this;

        geddy.model.User.first(params.id, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new geddy.errors.BadRequestError();
            }
            else {
                geddy.model.User.remove(params.id, function(err) {
                    if (err) {
                        throw err;
                    }
                    self.redirect("/users/list");
                });
            }
        });
    };
};

exports.Settings = Settings;