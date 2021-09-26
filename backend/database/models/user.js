const { Schema, model } = require('mongoose');

const userSchema = Schema({
  name: String,
  email: {
    type: String,
    unique: true,
  },
  password: String,
  status: { type: Boolean, default: false },
  showContact : { type: Boolean, default: false },
  telegram: String,
  surname: String,
  avatar: String,
  rating: { type: Number, default: 0 },
  job: { type: Schema.Types.ObjectId, ref: 'Company' },
});

module.exports = model('User', userSchema);
