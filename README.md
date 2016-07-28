# careerFairCheckin


## Allows recruiters to checkin at your table and receive an email with your resume link

## This app is a Node.js and Express.js example of how to integrate sendgrid's email system into your app. Use this app if you are at a career fair needing to easily keep track of the people visiting your table. The app will also send an email to the recipient with your resume.    
`git clone https://github.com/vporta/saveTheTreesResumeSender.git`

run: `npm install`

To start the server: `node server.js` or `nodemon server.js` if applicable

To get it working on your computer:

1. Signup for a sendgrid account
2. Create an API Key
3. Create an environment variable and plug in you API KEY `export SENDGRID_API_KEY=zzz`
4. In `/controllers/users_controller` on lines 56-59, put in your email address and resume link.

      ```
      var company = "Your Resume Link: https://drive.google.com/open?id=";
      var helper  = require('sendgrid').mail;
      from_email = new helper.Email("youremail@gmail.com")
      ```




