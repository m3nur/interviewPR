const { Schema, model } = require('mongoose');

const reviewSchema = Schema({
  company: { type: Schema.Types.ObjectId, ref: 'Company' },
  author: { type: Schema.Types.ObjectId, ref: 'User' },
  created: { type: Date, default: Date.now },
  companyName: String,
  likes: {
    type: Array,
    default: [],
  },
  rating: Number,
  setteled: Boolean,
  image: { type: String, default: '' },
  salary: Number,
  questions: String,
  impression: String,
  hrName: String,
  codFile: String,
  position: String,
  direction: String,
  companyId: String,
});

module.exports = model('Review', reviewSchema);
