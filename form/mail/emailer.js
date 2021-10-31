"use strict";
//under construction
let currentDomain = 'localhost:9000'
module.exports = {
  // setup e-mail data with unicode symbols
  //for outlookTransporter
  //delete these soon
  options: {
    from: '"Hello " <lingqingmeng05@gmail.com>',//'"Hello " <admin@androgeniq.com>', // sender address
    to:  'myrandomrecipient@gmail.com', // list of receivers
    subject: 'Checker Flag', // Subject line
    text: 'Title goes here', // plaintext body
    html: '<b>Do this task: </b><br/>' // html body
  },
  AuthVerifyTemplate: function (to,hash){
    this.from = '"Hello " <lingqingmeng05@gmail.com>';//'"Hello " <admin@androgeniq.com>', // sender address
    this.subject = 'Your verification Code';
    this.to = to;
    this.text = 'Please validate your email with this code: ' + hash;
    this.html = '<b>Please validate your email with this code: </b><br/>' + '<strong>' + hash + '</strong>';
  },
  ForgotPasswordTemplate: function (to,hash) {
    var dest =  env.ip + ':' + env.port +'/api/users/reset-password/' + hash
    this.from = '"My IT Admin" <lingqmeng05@gmail.com>';
    this.subject = "Follow these steps to reset your password";
    this.to = to;
    this.generateTextFromHTML= true;
    this.html= '<b>Enter this security code to reset your password ✔</b><br />'
        + '<h3>' + hash + '</h3>'
        + '<br />' 
  } 
}
