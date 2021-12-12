import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  demographics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
  },
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ['Club Member', 'Member'] },
});

MemberSchema.statics = {
  isUniqueEmail(string) {
    return this.find({ email: string }).then((result) => {
      if (result.length) {
        throw new Error('Email already in use');
      } else {
        return false;
      }
    });
  },
};

const Member = mongoose.model('Member', MemberSchema);

export default Member;
