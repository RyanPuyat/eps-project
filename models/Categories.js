const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
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
const myDb = mongoose.connection.useDb('scbtexam');
const Chemicals = myDb.model('Categories', CategorySchema, 'chemical');
const Electronics = myDb.model('Categories', CategorySchema, 'electronic');
const Foods = myDb.model('Categories', CategorySchema, 'food');
const Machineries = myDb.model('Categories', CategorySchema, 'machinery');
const Metals = myDb.model('Categories', CategorySchema, 'metal');
const Papers = myDb.model('Categories', CategorySchema, 'paper');
const Rubbers = myDb.model('Categories', CategorySchema, 'rubber');
const Textiles = myDb.model('Categories', CategorySchema, 'textile');
const Tests = myDb.model('Categories', CategorySchema, 'test');

module.exports = {
  Chemicals,
  Electronics,
  Foods,
  Machineries,
  Metals,
  Papers,
  Rubbers,
  Textiles,
  Tests,
};
