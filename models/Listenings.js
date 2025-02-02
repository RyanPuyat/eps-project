const mongoose = require('mongoose');

const ListeningSchema = new mongoose.Schema({
  question: {
    type: String,
  },
  category: {
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
const myDb = mongoose.connection.useDb('listening');
module.exports = myDb.model('Listenings', ListeningSchema, 'easy');
