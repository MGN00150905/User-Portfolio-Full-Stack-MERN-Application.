const mongoose = require('mongoose');
const User = require('./models/User');
const Folio = require('./models/Folio');

const mongo_uri = 'mongodb://localhost/react-auth';
mongoose.connect(mongo_uri, { useNewUrlParser: true }, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

User.findOne({email: 'marcgallagher9774@gmail.com'}, function(err, user) {
  if (err) throw err;

  let arr = [
    {p_name: 'Parkle',
      img: 'yo.jpg',
      desc: 'Parkling payment website',
      url: 'yoyoyo.com',
      user_id : user._id},
    {p_name: 'NewsApp',
      img: 'yso.jpg',
      desc: 'News  website',
      url: 'yoyoyo.com',
      user_id : user._id},
    {p_name: 'Gen Design',
      img: 'yyoyoyoo.jpg',
      desc: 'Design  website',
      url: 'yoyoyyoyyo.com',
      user_id : user._id}
  ];
  Folio.create(arr, function(err, res) {
    if(err) throw err;

    console.log(res);
  });
});
