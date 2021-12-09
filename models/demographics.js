const mongoose = require('mongoose');

const DemographicsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  lastname: {
    type: String,
    required: true,
    minLength: 1,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  state: {
    type: String,
    uppercase: true,
    trim: true,
    minLength: 2,
    maxLength: 2,
  },
  country: { type: String, trim: true, minLength: 4, maxLength: 56 },
});

module.exports = mongoose.model('Demographics', DemographicsSchema);
