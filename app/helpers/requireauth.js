
var requireAuth = function () {

    var username = this.session.get("username");

    if (!username)
    {
        this.redirect('users/login');
    }
};




exports.requireAuth = requireAuth;