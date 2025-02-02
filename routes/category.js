const express = require('express');
const router = express.Router();
const {
  Chemicals,
  Electronics,
  Machineries,
  Rubbers,
  Metals,
  Textiles,
  Foods,
  Papers,
  Tests,
} = require('../models/Categories');

router.get('/:category', async (req, res) => {
  try {
    const { category } = req.params;

    let data;

    switch (category) {
      case 'chemicals':
        data = await Chemicals.find();
        break;
      case 'electronics':
        data = await Electronics.find();
        break;
      case 'machinery':
        data = await Machineries.find();
        break;
      case 'rubbers':
        data = await Rubbers.find();
        break;
      case 'metals':
        data = await Metals.find();
        break;
      case 'textiles':
        data = await Textiles.find();
        break;
      case 'foods':
        data = await Foods.find();
        break;
      case 'papers':
        data = await Papers.find();
        break;
      case 'tests':
        data = await Tests.find();
        break;
      default:
        return res
          .status(400)
          .json({ success: false, error: 'Invalid category' });
    }

    res.send({ success: true, data: data });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Something went wrong' });
  }
});

module.exports = router;
