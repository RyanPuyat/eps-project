const mongoose = require('mongoose');

const BeginnerSchema = new mongoose.Schema({
  question: {
    type: String,
  },

  image: {
    type: String,
  },

  choices: {
    choiceImageUrl: Object,
    choiceText: String,
  },

  answer: {
    type: String,
  },
});
const myDb = mongoose.connection.useDb('reading');
module.exports = myDb.model('Beginners', BeginnerSchema, 'beginner');
