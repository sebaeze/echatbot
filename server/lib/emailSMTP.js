/*
*
*/
const fs                     = require('fs') ;
const path                   = require('path')  ;
const nodemailer             = require('nodemailer') ;
const htmlTemplate           = fs.readFileSync( path.join(__dirname,'./emailTemplate.html'), 'utf8' ) ;
//
module.exports.enviarEmail = function(argEmailConfiguracion,argSubject,argDestino,argBody){
    return new Promise(function(respOk,respRech){
        let argConfigEmail = argEmailConfiguracion.email[ process.env.AMBIENTE||"dev" ] ;
        try {
            //
            let mailOptions = {
                from:    "\""+argConfigEmail.nombreMuestraEmailGateway+(process.env.AMBIENTE=="dev" ? " - dev" : " " )+"\" <"+argConfigEmail.senderEmail+">",
                  to:      argDestino || argConfigEmail.emailDestinoDefault,
                subject: 'Hello ✔',
                text:    'Hello world?',
                html:    '<b>Hello world?</b>'
            };
            let transporter = {} ;
            if ( argConfigEmail.service && argConfigEmail.service.length>1 ){
                transporter = nodemailer.createTransport({
                    service: argConfigEmail.service,
                    secure: true,
                    auth:{
                        user: argConfigEmail.emailGateway,
                        pass: argConfigEmail.passwordEmailGateway
                    }
                }) ;
            } else {
                transporter = nodemailer.createTransport({
                    host: argConfigEmail.server,
                    port: argConfigEmail.puerto,
                    secure: false // true for 465, false for other ports
                }) ;
            }
            //
            mailOptions.subject = argSubject ;
            mailOptions.to      = argDestino || argConfigEmail.emailDestinoDefault ;
            argBody             = String(argBody).replace(/\n/g, "<br />") ;
            let tempHtml        = eval("`"+htmlTemplate+"`") ;
            mailOptions.html    = tempHtml ; //'<b>'+argBody+'<\b>' ;
            //
            nodemailer.createTestAccount((err, account) => {
                transporter.sendMail(mailOptions, (errorMail, info) => {
                    if (errorMail) {
                        console.log('\n\n *** ERROR: Se produjo error al enviar Email **** ') ;
                        console.dir(errorMail);
                        respRech( errorMail ) ;
                    } else {
                        console.log('Message sent: %s', info.messageId);
                        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                        respOk(info)
                    }
                });
            });
            //
        } catch(errEnvEmail){
            console.dir(argConfigEmail) ;
            console.dir(argSubject) ;
            console.dir(argDestino) ;
            console.dir(argBody) ;
            console.dir(errEnvEmail) ;
            respRech( errEnvEmail ) ;
        }
    }) ;
    //
} ;
//