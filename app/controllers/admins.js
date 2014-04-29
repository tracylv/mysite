var Admins = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 管理员";
    geddy.viewHelpers.menu_data.active_tab = "admin";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.category = function (req, resp, params) {
        this.respond({});
    };

    this.list = function (req, resp, params) {
        var self = this;
        var issuper = false;
        if(params.issuper == "true")
        {
            issuper = true;
        }

        geddy.model.Admin.all({ "issuper": issuper, not: {istop: true}},function(err, admins){
            if(err){
                throw err;
            }
            self.respondWith(admins, {type: "Admin"});
        });
    };

    this.show = function (req, resp, params) {
        var self = this;

        geddy.model.Admin.first(params.id, function(err, admin) {
            if (err) {
                throw err;
            }
            if (!admin) {
                throw new geddy.errors.NotFoundError();
            }
            else {
                self.respondWith(admin);
            }
        });
    };


    this.signup = function (req, resp, params) {
        this.respond({admin: params});
    };

    this.signup_post = function (req, resp, params) {
        var self = this;
        var admin = geddy.model.Admin.create(params);
        var duplicateuser = false;

        // check if user have already existed
        geddy.model.Admin.first({ username : admin.username}, function(err, curradmin) {
            if (err) {
                throw err;
            }
            if (curradmin) {
                admin.dupicateerror = "该用户名已被占用。";
                duplicateuser = true;
            }
        });

        if(!params.issuper)
        {
            admin.updateProperties({issuper: false});
        }
        else
        {
            admin.updateProperties({issuper: true});
        }

        if (!admin.isValid() || duplicateuser == true) {
            this.respond({admin: admin}, {format: 'html', template: 'app/views/admins/signup'});
        }
        else {
            admin.save(function(err, data) {
                if (err) {
                    throw err;
                }
                self.redirect("/admins/list");
            });
        }
    };

    this.edit = function (req, resp, params) {
        var self = this;

        geddy.model.Admin.first(params.id, function(err, admin) {
            if (err) {
                throw err;
            }
            if (!admin) {
                throw new geddy.errors.BadRequestError();
            }
            else {
                self.respondWith(admin);
            }
        });
    };

    this.update = function (req, resp, params) {
        var self = this;
        var duplicateuser = false;

        geddy.model.Admin.first(params.id, function(err, admin) {
            if (err) {
                throw err;
            }

            if(!params.issuper)
            {
                admin.updateProperties({issuper: false});
            }
            else
            {
                admin.updateProperties({issuper: true});
            }

            admin.updateProperties(params);

            // check if user have already existed
            geddy.model.Admin.first({ username : admin.username}, function(err, curradmin) {
                if (err) {
                    throw err;
                }
                if (curradmin) {
                    admin.dupicateerror = "该用户名已被占用。";
                    duplicateuser = true;
                }
            });

            if (!admin.isValid() || duplicateuser == true) {
                self.respond({admin: admin}, {format: 'html', template: 'app/views/admins/edit'});
            }
            else {
                admin.save(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    self.respond({admin: admin}, {format: 'html', template: 'app/views/admins/show'});
                });
            }
        });
    };

    this.remove = function (req, resp, params) {
        var self = this;

        geddy.model.Admin.first(params.id, function(err, admin) {
            if (err) {
                throw err;
            }
            if (!admin) {
                throw new geddy.errors.BadRequestError();
            }
            else {
                geddy.model.Admin.remove(params.id, function(err) {
                    if (err) {
                        throw err;
                    }
                    self.redirect("/admins/list");
                });
            }
        });
    };

};

exports.Admins = Admins;