const Product = require("../models/productsModel")
const  Recipe  = require('../models/recipeModel');



const createRecipe  = async (req, res)=>{
  try {
  const data= req.body;
      let {name, price,quantity}=data;

  console.log(name, price,quantity)
  const recipeCreated = await Recipe.create(data);
  res.status(201).send(recipeCreated);
  } catch (error) {
      res.status(500).send(`Internal Server Error: ${error.message}`);
  }
}

const getAllRecipes = async (req, res) => {
  try {
    const recipes = await Recipe.findAll();
    res.json(recipes);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
  createRecipe,
  getAllRecipes
};