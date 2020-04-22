/*
*
*/
// const enviarEmail          = require('../server/lib/emailEnviar').email ;
const nodemailer     = require('nodemailer') ;
const transporter    = nodemailer.createTransport({
    host: 'mail.waiboc.com',
    // port: 587,
    port: 25,
    // port: 143 ,
    secure: false ,
    auth: {
      /*
        user: "info@waiboc.com",
        pass: "!ZXCasdqwe123"
      */
      user: "info",
        pass: "qaz11qaz"
    },
    tls:{
        rejectUnauthorized: false
    },
    debug: true
});
console.log('....transporter: ',transporter) ;
//
let mailOptions = { to:   "sebaeze@gmail.com",from: "__yo_from__", subject: '__test nodemail__', html:    '<b> test html</b>' } ;
transporter.sendMail(mailOptions, err => {
    if (err) {
     console.log('....ERROR enviando:: ',err) ;
    } else {
        console.log('... funciono esta garomba') ;
    }
}) ;
//
/*
const fnEmail = enviarEmail({email:{
        emailGateway: "yoo_enviando",
        passwordEmailGateway: "qaz11qaz",
        emailSoporte: "emai_soporte",
        nombreMuestraEmailGateway:"__nombreMuestraEmailGateway__"
    }},"sebaeze@gmail.com") ;
//
let resuProm = fnEmail({
    subject: "__test dsde sendmail __" ,
    html: '<p></p><h2>testttt</h2>'
  },
  function (err, res) {
    if ( err ){
      console.log('....ERROR enviando email: ') ;
      console.dir(err) ;
    } else {
      console.log('* [example 1.1] send() callback returned: err:', err, '; res:', res) ;
    }
  }) ;
  */
//