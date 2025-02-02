const express = require('express');
const router = express.Router();
const Listenings = require('../models/Listenings');

router.get('/', async (req, res) => {
  const listenings = await Listenings.find();
  try {
    res.send({ success: true, data: listenings });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
