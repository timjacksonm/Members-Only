import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  demographics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
  },
  username: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ['Club Member', 'Member'] },
});

const Member = mongoose.model('Member', MemberSchema);

export default Member;
