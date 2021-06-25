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
  return this.find().sort('createdAt').limit(5).exec();
};

module.exports = model('posts', post);
