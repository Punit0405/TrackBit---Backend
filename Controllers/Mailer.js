const nodemailer = require('nodemailer');
try {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.MAILER_EMAIL,
          pass: process.env.MAILER_PASSWORD
        }
      });

module.exports=transporter;
    
} catch (error) {
    console.log(error.message)
    
}

