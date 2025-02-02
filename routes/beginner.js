const express = require('express');
const router = express.Router();
const Beginners = require('../models/Beginners');

router.get('/', async (req, res) => {
  const beginners = await Beginners.find();
  try {
    res.send({ success: true, data: beginners });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
