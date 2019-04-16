const Folio = require('../models/Folio.js');
const mongoose = require('mongoose');

const FolioSchema = mongoose.Schema({
  p_name: String,
  img: String,
  desc: String,
  url:String,
  user_id : { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Folio', FolioSchema);
