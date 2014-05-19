
var Settings = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 个人信息";
    geddy.viewHelpers.menu_data.active_tab = "admin";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.before(geddy.viewHelpers.requireAuth(null), { only: ['forgetpwd', 'forgetpwd_post'] });
    this.before(geddy.viewHelpers.requireAuth(geddy.model.User.userrole.user), { only: ['profile', 'profile_pwd', 'profile_info'] });

    this.profile = function (req, resp, params) {
        var self = this;
        var userid = self.session.get("userid");
        var userrole = self.session.get("userrole");

        if(userrole == geddy.model.User.userrole.user)
        {
            geddy.model.User.first(userid, function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    throw new geddy.errors.NotFoundError();
                }
                else {
                    self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                }
            });
        }
        else if(userrole == geddy.model.Admin.userrole.junior || userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super)
        {
            geddy.model.Admin.first(userid, function(err, user) {
                if (err) {
                    throw err;
                }
                if (!user) {
                    throw new geddy.errors.NotFoundError();
                }
                else {
                    self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                }
            });
        }
    };

    this.profile_pwd = function (req, resp, params) {
        var self = this;
        var userid = self.session.get("userid");
        var userrole = self.session.get("userrole");
        var model;

        if(userrole == geddy.model.User.userrole.user)
        {
            model = geddy.model.User;
        }
        else if(userrole == geddy.model.Admin.userrole.junior || userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super)
        {
            model = geddy.model.Admin;
        }

        model.first(userid, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new geddy.errors.BadRequestError();
            }
            else {

                if(user.password != params.oldpassword)
                {
                    user.oldPwdWrong = geddy.model.User.oldPwdWrongInfo;
                    self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                }
                else
                {
                    user.updateProperties({ password : params.password, confirmpassword : params.confirmpassword });

                    if (!user.isValid()) {
                        self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                    }
                    else {
                        user.save(function(err, data) {
                            if (err) {
                                throw err;
                            }

                            user.changePwdSuccess = true;
                            self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                        });
                    }

                }

            }
        });
    };

    this.profile_info = function (req, resp, params) {
        var self = this;
        var duplicate = false;
        var userid = self.session.get("userid");
        var userrole = self.session.get("userrole");

        var model;
        if(userrole == geddy.model.User.userrole.user)
        {
            model = geddy.model.User;
        }
        else if(userrole == geddy.model.Admin.userrole.junior || userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super)
        {
            model = geddy.model.Admin;
        }

        model.first(userid, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new geddy.errors.BadRequestError();
            }
            else {

                // check if user have already existed
                if(user.email != params.email) {
                    model.first({ email : params.email}, function(err, curruser) {
                        if (err) {
                            throw err;
                        }
                        if (curruser) {
                            user.duplicateEmail = geddy.model.User.duplicateEmailError;
                            duplicate = true;
                        }
                    });
                }

                user.updateProperties({ nickname : params.nickname, email : params.email });

                if (!user.isValid() || duplicate == true) {
                    self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                }
                else {
                    user.save(function(err, data) {
                        if (err) {
                            throw err;
                        }

                        user.changeInfoSuccess = true;
                        self.session.set("username", user.nickname);
                        self.respond({user: user}, {format: 'html', template: 'app/views/settings/profile'});
                    });
                }
            }
        });
    };

    this.forgetpwd = function (req, resp, params) {
        var self = this;

        self.respond({user: params}, {format: 'html', template: 'app/views/settings/forgetpwd'});

    };

    this.forgetpwd_post = function (req, resp, params) {
        var self = this;



    };
};

exports.Settings = Settings;