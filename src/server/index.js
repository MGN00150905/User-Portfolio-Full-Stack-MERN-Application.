const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const port = process.env.PORT || 8080;
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');
const Folio = require('./models/Folio');
const withAuth = require('./middleware');

const app = express();

const secret = 'secret_should_not_be_in_git';

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// serve the budled files from the dist directory for deployment
app.use(express.static('dist'));

const mongo_uri = 'mongodb+srv://marcg94:venner94@userportfolios-5wyga.mongodb.net/react-auth?retryWrites=true';
// const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

// app.use(express.static(path.join(__dirname, 'public')));
//
//
// app.get('/', function(req, res) {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });

app.get('/api/home', function(req, res) {
  res.send('Welcome!');
});

// User Endpoints ------------

// Fetch all registered users
app.get('/api/users', function(req, res) {
  User.find({}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

// Get users by Id
app.get('/api/users/:id', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

// Portfolio Endpoints ------------

// Using Populate() function here in order to be able to access the user details of each portfolio
app.get('/api/folios', function(req, res) {
  Folio.find({}).populate('user_id').exec (function(err, data) {
    if (err) throw err;

    res.send(data);
  });
});

// Gets Portfolios by ID
app.get('/api/folios/:id', (req, res) => {
  Folio.findOne({_id: new ObjectID(req.params.id) }, (err, result) => {
    if (err) throw err;

    console.log(result);
    res.send(result);
  });
});

// update user based on info supplied in request body
app.put('/api/folios', (req, res) => {
  // get the ID of the portfolio to be updated
  const id  = req.body._id;
  // remove the ID so as not to overwrite it when updating
  delete req.body._id;
  // find a user matching this ID and update their details
  Folio.updateOne( {_id: new ObjectID(id) }, {$set: req.body}, (err, result) => {
    if (err) throw err;

    console.log('updated in database');
    return res.send({ success: true });
  });
});



// app.post('/api/folio', (req, res) => {
//   const folio = new Folio(req.body);
//
//   folio.save((err, result) => {
//     if (err) throw err;
//
//     console.log('created in database');
//     res.redirect('/');
//   });
// });


// Create new portfolio
app.post('/api/folios', function(req, res) {
  const { p_name, img, desc, url, user_id } = req.body;
  const folio = new Folio({ p_name, img, desc, url, user_id });
  console.log(folio);
  folio.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.delete('/api/folios', (req, res) => {
  Folio.deleteOne( {_id: new ObjectID(req.body.id) }, err => {
    if (err) return res.send(err);

    console.log('deleted from database');
    return res.send({ success: true });
  });
});

// This was an important Endpoint
// Receives all portfolios by one specfic User.
// Requesting the users parametres using populate()
app.get('/api/users/:id/folios', function(req, res) {
  User.findOne({_id: req.params.id}, function(err, data) {
    console.log(req.params.id);
    console.log(data._id);
    if (err) throw err;

    Folio.find({user_id: data._id}).populate('user_id').exec( function(err, folio) {
      if (err) throw err;
      console.log(folio);

      res.send(folio);
    });
  });
});
// app.get('/api/users', function(req, res) {
//   res.send('The password is potato');
// });


// Register/Create new User
app.post('/api/register', function(req, res) {
  const { name, email, password } = req.body;
  const user = new User({ name, email, password });
  user.save(function(err) {
    if (err) {
      console.log(err);
      res.status(500).send('Error registering new user please try again.');
    } else {
      res.status(200).send('Welcome to the club!');
    }
  });
});

app.post('/api/authenticate', function(req, res) {
  const { email, password } = req.body;
  User.findOne({ email }, function(err, user) {
    if (err) {
      console.error(err);
      res.status(500)
        .json({
          error: 'Internal error please try again'
        });
    } else if (!user) {
      res.status(401)
        .json({
          error: 'Incorrect email or password'
        });
    } else {
      user.isCorrectPassword(password, function(err, same) {
        if (err) {
          res.status(500)
            .json({
              error: 'Internal error please try again'
            });
        } else if (!same) {
          res.status(401)
            .json({
              error: 'Incorrect email or password'
            });
        } else {
          // Issue token
          const payload = { email };
          const token = jwt.sign(payload, secret, {
            expiresIn: '1h'
          });
          res.cookie('token', token, { httpOnly: true }).send(user);
        }
      });
    }
  });
});

app.get('/api/checkToken', withAuth, function(req, res) {
  res.sendStatus(200);
});

app.get('/api/logout', withAuth, function(req, res) {
  res.cookie('token', '', { httpOnly: true }).sendStatus(200);;
});

app.listen(port);
