
var session_obj = {
    userid: "",
    username: "",
    userrole: ""
};

var requireAuth = function (usertype) {

    var userid = this.session.get("userid");
    var username = this.session.get("username");
    var userrole = this.session.get("userrole");

    // if don't have some session or session lost
    if (!userid || !username || !userrole)
    {
        this.redirect('users/login');
    }
};



exports.session_obj = session_obj;
exports.requireAuth = requireAuth;