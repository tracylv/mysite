var Users = function () {
    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    this.signup = function (req, resp, params) {
        this.respond({params: params});
    };

    this.signup_post = function (req, resp, params) {
        var self = this
            , user = geddy.model.User.create(params);

        if (!user.isValid()) {
            this.respondWith(user);
        }
        else {
            user.save(function(err, data) {
                if (err) {
                    throw err;
                }
                self.respondWith(user, {status: err});
            });
        }
    };
};

exports.Users = Users;