var Users = function () {

    geddy.viewHelpers.page_info.page_title = "我的网站 - 用户";
    //geddy.viewHelpers.menu_data.active_tab = "admin";

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.before(geddy.viewHelpers.requireAuth(null), { only: ['login', 'login_post', 'logout', 'signup', 'signup_post'] });
    this.before(geddy.viewHelpers.requireAuth(geddy.model.Admin.userrole.junior), { only: ['list', 'show', 'edit', 'update', 'remove'] });


    this.login = function (req, resp, params) {

        // set auto login default value
        params.autologin = true;

        if(req.headers.referer && !geddy.string.include(req.headers.referer, "signup")){
            params.redirecturl = req.headers.referer;
        }

        this.respond({user: params});
    };

    this.login_post = function (req, resp, params) {
        var self = this;

        geddy.model.User.first({username: params.username, password: params.password}, function(err, user) {
            if (err) {
                throw err;
            }
            if (user) {

                // set auto login
                if(!!params.autologin == true)
                {
                    self.cookies.set("userid", user.id, {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", 7)});
                    self.cookies.set("usertype", geddy.viewHelpers.user_type.user, {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", 7)});
                }
                else
                {
                    self.cookies.set("userid", user.id, {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", -1)});
                    self.cookies.set("usertype", geddy.viewHelpers.user_type.user, {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", -1)});
                }

                // set session
                self.session.set("userid", user.id);
                self.session.set("username", user.nickname);
                self.session.set("userrole", geddy.model.User.userrole.user);

                // redirect after successful login
                if(params.redirecturl)
                {
                    self.redirect(params.redirecturl);
                }
                else
                {
                    self.redirect("/");
                }

            }
            else {
                params.loginError = geddy.model.User.loginError;
                self.respond({user: params}, {format: 'html', template: 'app/views/users/login'});
            }
        });
    };

    // this logout is for both user and admin
    this.logout = function (req, resp, params) {

        // clear cookie
        this.cookies.set("userid", "", {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", -1)});
        this.cookies.set("usertype", "", {domain : geddy.config.hostname, path : "/", expires : geddy.date.add(new Date(), "day", -1)});

        // clear session
        this.session.unset("userid");
        this.session.unset("username");
        this.session.unset("userrole");

        if(req.headers.referer)
        {
            this.redirect(req.headers.referer);
        }
        else
        {
            this.redirect("/");
        }
    };

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
        var self = this;
        var user = geddy.model.User.create(params);
        var duplicateuser = false;

        // check if user have already existed
        geddy.model.User.first({ username : user.username}, function(err, curruser) {
            if (err) {
                throw err;
            }
            if (curruser) {
                user.dupicateerror = geddy.model.User.duplicateUsernameError;
                duplicateuser = true;
            }
        });

        if (!user.isValid() || duplicateuser == true) {
            self.respond({user: user}, {format: 'html', template: 'app/views/users/signup'});
        }
        else {
            user.save(function(err, data) {
                if (err) {
                    throw err;
                }

                user.signupSuccess = true;
                self.respond({ user : user }, {format: 'html', template: 'app/views/users/signup'});
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
        var duplicateuser = false;

        geddy.model.User.first(params.id, function(err, user) {
            if (err) {
                throw err;
            }

            // check if user have already existed
            if(user.username != params.username) {
                geddy.model.User.first({ username : params.username}, function(err, curruser) {
                    if (err) {
                        throw err;
                    }
                    if (curruser) {
                        user.dupicateerror = geddy.model.User.duplicateUsernameError;
                        duplicateuser = true;
                    }
                });
            }

            user.updateProperties(params);

            if (!user.isValid() || duplicateuser == true) {
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