const express = require('express');
const router = express.Router();
const AudioLearning = require('../models/AudioLearning');

router.get('/', async (req, res) => {
  const audioLearning = await AudioLearning.find();
  try {
    res.send({ success: true, data: audioLearning });
  } catch (error) {
    res.status(200).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
