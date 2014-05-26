var Emails = function () {

    this.respondsWith = ['html', 'json', 'xml', 'js', 'txt'];

    //get password email controller
    this.pwdemail = function (req, resp, params) {
        var self = this;
        self.respond({user: params}, {layout: false});
    };
};



exports.Emails = Emails;