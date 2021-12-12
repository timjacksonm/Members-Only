import mongoose from 'mongoose';

const DemographicsSchema = new mongoose.Schema({
  firstname: {
    type: String,
    minLength: 1,
    maxLength: 30,
    lowercase: true,
    trim: true,
  },
  lastname: {
    type: String,
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
  country: { type: String, trim: true, minLength: 2, maxLength: 56 },
});

const Demographics = mongoose.model('Demographics', DemographicsSchema);

export default Demographics;
