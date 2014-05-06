
var session_obj = {
    userid: "",
    username: "",
    userrole: ""
};

var requireAuth = function (authType) {
    var self = this;

    // sessions
    var userid = self.session.get("userid");
    var username = self.session.get("username");
    var userrole = self.session.get("userrole");

    // cookies
    var cuserid = self.cookies.get("userid", {domain : geddy.config.hostname});
    var cusertype = self.cookies.get("usertype", {domain : geddy.config.hostname});


    // if don't have some session or session lost
    if (!userid || !username || !userrole)
    {
        // if no cookies
        if(!cuserid || !cusertype)
        {
            // for users
            if(authType == geddy.model.User.userrole.user)
            {
                self.redirect('users/login');
            }

            // for admins
            if(authType == geddy.model.Admin.userrole.junior || authType == geddy.model.Admin.userrole.senior || authType == geddy.model.Admin.userrole.super)
            {
                self.redirect('admins/login');
            }
        }
        else
        {
            // for user
            if(cusertype == geddy.viewHelpers.user_type.user)
            {
                geddy.model.User.first({ id: cuserid}, function(err, user) {
                    if (err) {
                        throw err;
                    }
                    if (user) {

                        // set session
                        self.session.set("userid", user.id);
                        self.session.set("username", user.nickname);
                        self.session.set("userrole", geddy.model.User.userrole.user);
                        geddy.viewHelpers.session_obj.userid = self.session.get("userid");
                        geddy.viewHelpers.session_obj.username = self.session.get("username");
                        geddy.viewHelpers.session_obj.userrole = self.session.get("userrole");
                    }
                    else {
                        self.redirect('users/login');
                    }
                });

            }

            if(cusertype == geddy.viewHelpers.user_type.admin)
            {
                geddy.model.Admin.first({id: cuserid}, function(err, admin) {
                    if (err) {
                        throw err;
                    }
                    if (admin) {

                        // set session
                        self.session.set("userid", admin.id);
                        self.session.set("username", admin.nickname);
                        geddy.viewHelpers.session_obj.userid = self.session.get("userid");
                        geddy.viewHelpers.session_obj.username = self.session.get("username");

                        if(admin.istop == true)
                        {
                            self.session.set("userrole", geddy.model.Admin.userrole.super);
                        }
                        else if(admin.issuper == true)
                        {
                            self.session.set("userrole", geddy.model.Admin.userrole.senior);
                        }
                        else
                        {
                            self.session.set("userrole", geddy.model.Admin.userrole.junior);
                        }
                        geddy.viewHelpers.session_obj.userrole = self.session.get("userrole");

                    }
                    else {
                        self.redirect('admins/login');
                    }
                });

            }
        }
    }

    // get updated session
    userid = self.session.get("userid");
    username = self.session.get("username");
    userrole = self.session.get("userrole");

    if(!userid || !username || !userrole)
    {
        if(authType != null)
        {
            throw new geddy.errors.UnauthorizedError();
        }
    }
    else
    {
        if(authType == geddy.model.User.userrole.user && !(userrole == geddy.model.User.userrole.user || userrole == geddy.model.Admin.userrole.junior || userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super))
        {
            throw new geddy.errors.UnauthorizedError();
        }

        if(authType == geddy.model.Admin.userrole.junior && !(userrole == geddy.model.Admin.userrole.junior || userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super))
        {
            throw new geddy.errors.UnauthorizedError();
        }

        if(authType == geddy.model.Admin.userrole.senior && !(userrole == geddy.model.Admin.userrole.senior || userrole == geddy.model.Admin.userrole.super))
        {
            throw new geddy.errors.UnauthorizedError();
        }

        if(authType == geddy.model.Admin.userrole.super && !(userrole == geddy.model.Admin.userrole.super))
        {
            throw new geddy.errors.UnauthorizedError();
        }
    }



};



exports.session_obj = session_obj;
exports.requireAuth = requireAuth;