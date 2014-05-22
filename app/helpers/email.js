var nodemailer = require("nodemailer");

var sendEmail = function (emailopt, success, fail) {

//    emailopt:
//    example emailopt:
//    {
//        url : "absolute url",
//        method : 'GET',
//        data: data to send on Post method
//        to : "example.163.com",
//        subject: "subject text"
//    }
//    success: it's a success callback function
//    fail: it's a fail callback function

    geddy.request({url: emailopt.url, headers: { data : geddy.uri.paramify(emailopt.data)}, method: emailopt.method ? emailopt.method : 'GET'}, function (err, htmldata) {
        if (err) {
            fail();
        }
        else
        {
            var smtpTransport = nodemailer.createTransport("SMTP", geddy.config.email);

            // setup e-mail data with unicode symbols
            var from = "MySite ✔ <" + geddy.config.email.auth.user + ">";
            var mailOptions = {
                from: from,
                to: emailopt.to,
                subject: emailopt.subject,
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