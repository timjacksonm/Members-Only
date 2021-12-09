const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  demographics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
    required: true,
  },
  username: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ['Club Member', 'Member'] },
});

module.exports = mongoose.model('Member', MemberSchema);
