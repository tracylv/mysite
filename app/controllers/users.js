var Users = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 用户";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.list = function (req, resp, params) {
        var self = this;

        geddy.model.User.all(function(err, users){
           if(err){
               throw err;
           }
           self.respondWith(users, {type: "User"});
        });
    };

    this.show = function (req, resp, params) {
        var self = this;

        geddy.model.User.first(params.id, function(err, user) {
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


    this.signup = function (req, resp, params) {
        this.respond({user: params});
    };

    this.signup_post = function (req, resp, params) {
        var self = this
            , user = geddy.model.User.create(params);

        if (!user.isValid()) {
            this.respond({user: user}, {format: 'html', template: 'app/views/users/signup'});
        }
        else {
            user.save(function(err, data) {
                if (err) {
                    throw err;
                }
                self.redirect("/users/list");
            });
        }
    };

    this.edit = function (req, resp, params) {
        var self = this;

        geddy.model.User.first(params.id, function(err, user) {
            if (err) {
                throw err;
            }
            if (!user) {
                throw new geddy.errors.BadRequestError();
            }
            else {
                self.respondWith(user);
            }
        });
    };

    this.update = function (req, resp, params) {
        var self = this;

        geddy.model.User.first(params.id, function(err, user) {
            if (err) {
                throw err;
            }
            user.updateProperties(params);

            if (!user.isValid()) {
                self.respond({user: user}, {format: 'html', template: 'app/views/users/edit'});
            }
            else {
                user.save(function(err, data) {
                    if (err) {
                        throw err;
                    }
                    self.respond({user: user}, {format: 'html', template: 'app/views/users/show'});
                });
            }
        });
    };

    this.remove = function (req, resp, params) {
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

exports.Users = Users;