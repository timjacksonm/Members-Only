import mongoose from 'mongoose';

const MessageSchema = new mongoose.Schema({
  username: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Member',
    required: true,
  },
  message: { type: String, required: true, minLength: 1, maxLength: 50 },
  date: { type: Date, required: true },
  view: {
    type: String,
    required: true,
    enum: ['Club Members Only', 'Members Only', 'Public'],
  },
});

const Message = mongoose.model('Message', MessageSchema);

export default Message;
