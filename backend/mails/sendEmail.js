const nodemailer = require ('nodemailer')
const ip = require ( 'ip')
const EMAIL = "nadibelgacem3@gmail.com"
const PASSWORD = "Mohamed2016"
const IP_ADRESS = ip.address()
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: PASSWORD
    }
});

 function sendPasswords(email,fullName, password, callback) {
    const mailOptions = {
        from: EMAIL, 
        to: email, 
        subject: 'Application', 
        html: '<p>Bonjour '+fullName+' et bienvenue, Pour accéder à notre application, utilisez ce mot de passe et vous pourrez le changer plus tard.</p><br/> <p>Nouveau mot de passe :</p> <b>' + password + '</b><br/><p> pour vous authentifier à notre application. <a href="http://' + IP_ADRESS + ':3000/">cliquez ici</a></p>'// plain text body
    };
    transporter.sendMail(mailOptions, (err, res) => {
        if (err)
            callback(false)
        else
            callback(true)
    })
}
module.exports.sendPasswords = sendPasswords;