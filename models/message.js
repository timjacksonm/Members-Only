const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  message: { type: String, required: true, minlength: 1, maxlength: 50 },
  time: Number,
  view: {
    type: String,
    required: true,
    enum: ['Club Member Only', 'Member Only', 'Public'],
  },
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
});

module.exports = mongoose.model('Message', MessageSchema);
