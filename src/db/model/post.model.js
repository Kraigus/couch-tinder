const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const post = new Schema(
  {
    title: String,
    body: String,
    createdAt: String,
    updatedAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: true }
);

post.statics.mostRecent = async function () {
  return this.find().sort({createdAt : -1}).limit(5).populate('author').exec();
};

module.exports = model('posts', post);
