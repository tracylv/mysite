var Emails = function () {

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    //get password email controller
    this.pwdemail = function (req, resp, params) {
        var self = this;
        var user = {};
        if(req.headers.data)
        {
            user = geddy.uri.objectify(req.headers.data);
        }
        self.respond({user: user}, {layout: false});
    };
};



exports.Emails = Emails;