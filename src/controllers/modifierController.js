const Modifier= require('../models/modifierModel');

const getAllModifiers = async (req, res) => {
  try {
    console.log("some")
    const modifier = await Modifier.findAll();
    res.json(modifier);
  }catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

 
module.exports = {
  getAllModifiers,
};