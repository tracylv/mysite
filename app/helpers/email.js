var nodemailer = require("nodemailer");

var sendEmail = function (user, success, fail) {

    geddy.request({url: 'http://localhost:4000/emails/pwdemail', method: 'GET'}, function (err, htmldata) {
        if (err) {
            fail();
        }
        else
        {
            var smtpTransport = nodemailer.createTransport("SMTP", geddy.config.email);

            // setup e-mail data with unicode symbols
            var from = "MySite ✔ <" + geddy.config.email.auth.user + ">";
            var to = user.nickname + " <" + user.email + ">";
            var mailOptions = {
                from: from,
                to: to,
                subject: "[MySite] 密码找回 ✔",
                generateTextFromHTML: true,
                html: htmldata
            };

            // send mail with defined transport object
            smtpTransport.sendMail(mailOptions, function(error, response){
                if(error){
                    // fail callback
                    fail();
                }else{
                    // success callback
                    success();
                }

                smtpTransport.close();
            });
        }
    });
};

exports.sendEmail = sendEmail;