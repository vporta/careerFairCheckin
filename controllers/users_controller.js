
var express = require('express');
var session = require('express-session');

var router = express.Router();

var User = require('../models/User.js');

var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)
var helper = require('sendgrid').mail
var helpers = require('../helpers/mail');


// === HOME PAGE ======
router.get('/', function (req, res) {
var data = {};
if (req.session) {
  User.find({}).then(function(result) {
    data.users = result;
    }).then(function(docs) {
      
      res.render('index', {
        data: data,
        layout: 'main'
      })
    })
} else {
  res.send('Start a Session!')
}
});

router.post('/users/save', function (req, res) {

  console.log('Session here ' + req.session);

  var obj = {
    // _id: req.session.id,
    name: req.body.fname,
    email: req.body.email,
    company: req.body.company,
    title: req.body.title
  };
  var newUser = new User(obj);
  newUser.save(function(err, result) {
   console.log(newUser);
   console.log('Result' + result);
  })
  .then(function() {

    req.session.name = req.body.fname;
    req.session.email = req.body.email;
    req.session.company = req.body.company

    // var mailsubject = req.body.subject;
    var name = req.session.name;
    var email = req.session.email;
    var company = "Your Name: <Resume Link Here>";
    
    var helper  = require('sendgrid').mail;
    from_email = new helper.Email("") // Your email goes here
    to_email = new helper.Email(email) 
    subject = name;
    content = new helper.Content("text/plain", company)
    mail = new helper.Mail(from_email, subject, to_email, content)

    var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY);
    var requestBody = mail.toJSON()
    var request = sg.emptyRequest()
    request.method = 'POST'
    request.path = '/v3/mail/send'
    request.body = requestBody

    sg.API(request, function (response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
      console.log(response)
    })
    res.redirect('/');
  
  });
});






module.exports = router;