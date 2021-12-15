const nodemailer = require("nodemailer");

const sendEmail = async (email, subject1, link) => {
    // try {
        const transporter = nodemailer.createTransport({
            // host: process.env.HOST,
            service: process.env.SERVICE,
            // port:  587,
            // secure: true,
            auth: {
                user: process.env.USER1,
                pass: process.env.PASS,
            },
        });
        const maildetails={
            from:process.env.USER1,
            to:"kabila@biovustech.com",   // defaul email resever
            subject:subject1,
            text:link
            
        }
        console.log(maildetails)

        await transporter.sendMail(maildetails, function(err,data){
            if(err){
                console.log(err)
                console.log('Error in sending mail')
            }
            else{
                console.log('Mail sent')
            }

        });
    // } catch (error) {
    //     console.log(error, "email not sent");
    // }
};

module.exports = sendEmail;