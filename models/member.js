import mongoose from 'mongoose';

const MemberSchema = new mongoose.Schema({
  demographics: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Demographics',
  },
  email: { type: String, required: true, lowercase: true, trim: true },
  password: { type: String, required: true, trim: true },
  status: { type: String, required: true, enum: ['Club Member', 'Member'] },
  admin: { type: Boolean, required: true },
});

MemberSchema.statics.isUniqueEmail = function isUniqueEmail(string) {
  return this.find({ email: string }).then((result) => {
    if (result.length) {
      throw new Error('Email already in use');
    } else {
      return false;
    }
  });
};

MemberSchema.statics.isRegisteredEmail = function isRegisteredEmail(string) {
  return this.find({ email: string }).then((result) => {
    if (result.length) {
      return true;
    } else {
      throw new Error('Email is not registered sign up below to proceed.');
    }
  });
};

const Member = mongoose.model('Member', MemberSchema);

export default Member;
