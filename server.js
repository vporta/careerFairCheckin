var path = require('path'),
    express = require('express'),
    logger = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cookieParser = require('cookie-parser'),
    mongoose = require('mongoose'),
    
    User = require('./models/User.js'),
    sendgrid = require('./helpers/mail');

//======Express========
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({type:'application/vnd.api+json'}));
app.use(cookieParser());

app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret

//Express handlebars middleware
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));


//Require Controllers
var users_controller = require('./controllers/users_controller.js');
app.use('/', users_controller);



// ==== SET PORT ====
var port = process.env.PORT || 3000;




// ==== REQUIRE MONGOOSE ====
var mongoose = require('mongoose');

// Save MongoDB directory to a db var
var db = 'mongodb://localhost/resumeSender';

// Connect that directory to Mongoose, for simple, powerful querying
mongoose.connect(db, function(err){
  // log any errors connecting with mongoose
  if(err){
    console.log(err);
  } 
  // or log a success message
  else {
    console.log('mongoose connection is successful on: ' + db);
  }
});





app.listen(port, function() {
  console.log("Let's do this! On port:", + port);
});



