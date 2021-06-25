const { Schema, model, pluralize } = require('mongoose');

pluralize(null);

const post = new Schema(
  {
    title: String,
    body: String,
    createdAt: String,
    updatedAt: Date,
    author: { type: Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);


module.exports = model('posts', post);
