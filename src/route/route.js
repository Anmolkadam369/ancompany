const express = require('express');
const router = express.Router();

const productController = require('../controllers/productController');
const recipeController = require('../controllers/recipeController');
const orderController = require('../controllers/orderController');
const modifierController = require('../controllers/modifierController');

router.post('/createproduct', productController.createProduct);
router.get('/products', productController.getAllProducts);

router.post('/createRecipe', recipeController.createRecipe);
router.get('/recipes', recipeController.getAllRecipes);

router.post('/placeOrder', orderController.placeOrder);
router.get('/orders', orderController.getAllOrders);

router.get('/modifiers', modifierController.getAllModifiers);



router.all("/*", function(req,res){
    res.status(400).send({status:false, message:"invalid http request"});
})
 

module.exports=router;
