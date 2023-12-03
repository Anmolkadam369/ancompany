const { Sequelize  } = require('sequelize');
const Product  = require('../models/productsModel');

const createProduct  = async (req, res)=>{
    try {
    const data= req.body;
        let {name, price, quantity}=data;
    console.log(name, price,quantity)
    const newProduct = await Product.create(data);
    res.status(201).send(newProduct);
    } catch (error) {
        res.status(500).send(`Internal Server Error: ${error.message}`);
    }
}


const getAllProducts = async (req, res) => {
  try {
    console.log("some")
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};


module.exports = {
    createProduct,
  getAllProducts
};