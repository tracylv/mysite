var nodemailer = require("nodemailer");

var sendEmail = function (user, success, fail) {


    var smtpTransport = nodemailer.createTransport("SMTP", geddy.config.email);

    // setup e-mail data with unicode symbols
    var mailOptions = {
        from: "NoReply ✔ <my.site@outlook.com>",
        to: "lv_tengfei@163.com",
        subject: "Hello ✔",
        text: "Hello world ✔",
        html: "<b>Hello world ✔</b>"
    };

    // send mail with defined transport object
    smtpTransport.sendMail(mailOptions, function(error, response){
        if(error){
            console.log(error);

            // fail callback
            fail();
        }else{
            console.log("Message sent: " + response.message);

            // success callback
            success();
        }

        smtpTransport.close();
    });
};

exports.sendEmail = sendEmail;