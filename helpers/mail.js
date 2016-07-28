var helpers = {

  send: function(toSend){
    console.log(JSON.stringify(toSend, null, 2))
    //console.log(JSON.stringify(toSend))

    // var sg = require('sendgrid').SendGrid(process.env.SENDGRID_API_KEY)

    var requestBody = toSend
    var emptyRequest = require('sendgrid-rest').request
    var requestPost = JSON.parse(JSON.stringify(emptyRequest))
    requestPost.method = 'POST'
    requestPost.path = '/v3/mail/send'
    requestPost.body = requestBody
    sg.API(requestPost, function (response) {
      console.log(response.statusCode)
      console.log(response.body)
      console.log(response.headers)
    })
  },
// send(helloEmail());
  helloEmail: function(){
    var helper = require('sendgrid').mail

    from_email = new helper.Email("vporta7@gmail.com")
    to_email = new helper.Email("vporta7@yahoo.com") //user email address
    subject = 'Welcome to CesarCells!';
    content = new helper.Content("text/plain", "Hi")
    mail = new helper.Mail(from_email, subject, to_email, content)
    email = new helper.Email("vporta7@gmail.com")
    mail.personalizations[0].addTo(email)

    return mail.toJSON()
  }
}

module.exports = helpers;


// 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