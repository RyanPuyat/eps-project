const mongoose = require('mongoose');

const AudioLearningSchema = new mongoose.Schema({
  audio: {
    type: String,
  },

  hangul: {
    type: String,
  },

  slang: {
    type: String,
  },

  english: {
    type: String,
  },

  category: {
    type: String,
  },
});

const myDb = mongoose.connection.useDb('audioLearning');
module.exports = myDb.model('AudioLearning', AudioLearningSchema, 'audioEasy');
