// require mongoose
var mongoose = require('mongoose');
// create Schema class
var Schema = mongoose.Schema;

// Create article schema
var articleSchema = new Schema({
  // title is required
  title: {
    type:String,
    required:true
  },
  // link is required
  // this only saves one note's ObjectId. ref refers to the Note model.
  note: {
      type: Schema.Types.ObjectId,
      ref: 'note'
  }
});

// Create the Article model with the ArticleSchema
var article = mongoose.model('article', articleSchema);

// export the model
module.exports = article;