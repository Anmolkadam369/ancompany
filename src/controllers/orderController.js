const { Order, Recipe, Modifier, Product } = require('../models/associations');
// const  Order  = require('../models/orderModel');
// const  Recipe  = require('../models/recipeModel');
// const  Product  = require('../models/productsModel');
// const  Modifier  = require('../models/modifierModel');

// Define Sequelize models (assuming you have already defined Product, Recipe, Order, and Modifier models)

// Define associations between models
// ...

// Controller to handle the order request
// const placeOrder = async (req, res) => {
//   try {
//     const { amount, recipes } = req.body;

//     // Create a new order
//     const order = await Order.create({ amount });
//     console.log(order);

//     // Process each recipe in the order
//     for (const recipeData of recipes) {
//       const { recipe_id, quantity, modifiers } = recipeData;

//       // Find the recipe
//       const recipe = await Recipe.findByPk(recipe_id);
//       if (!recipe) {
//         return res.status(404).json({ error: 'Recipe not found' });
//       } 
//       console.log(recipe);

//       // Associate the recipe with the order
//       await order.addRecipe(recipe, { through: { quantity } });

//       // Process modifiers for the recipe
//       for (const modifierData of modifiers) {
//         const { product_id, quantity: modifierQuantity } = modifierData;

//         // Find the product (modifier) and associate it with the recipe
//         const product = await Product.findByPk(product_id);
//         if (!product) {
//           return res.status(404).json({ error: 'Product not found' });
//         }

        
//             console.log("some : " , order.id)
        
//             console.log("some : " , recipe.id)
//         await Modifier.create({
//           quantity: modifierQuantity,
//           // orderId: order.id,
//           recipeId: recipe.id,
//           productId: product.id,
//         });
//       }   
//     }
//     console.log('________________________________');
//     // Fetch the order with associated recipes and modifiers
//     const responseOrder1 = await Order.findByPk(order.id);
//     console.log("p",responseOrder1.dataValues.id ,responseOrder1.dataValues.amount )
//     console.log("j", recipes[0].recipe_id)
//     // for()
//     const recipeId = await Recipe.findAll();
//     console.log("n" , recipeId)
//     console.log("pi",responseOrder1.dataValues.id ,responseOrder1.dataValues.amount )
//     for(let i=0;i<recipes; i++){
      
//     }
  
//     let data = 
//       {
//         Id: responseOrder1.dataValues.id , 
//         amt : responseOrder1.dataValues.amount,
//         recipes : [

//         ]
//     }

// return res.json(data)

    
//     const responseOrder = await Order.findByPk(order.id, {
//       include: [
//         {
//           model: Recipe,
//           include: [
//             {
//               model: Modifier,
//               include: Product,
//             },
//           ],
//         },
//       ],
//     });

//     // Send the response
//     res.json(responseOrder);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// };



// const placeOrder = async (req, res) => {
//   try {
//     console.log("some ", req.body);
//     let data = req.body;
//     let { amount, recipes } = data;

//     if (!amount) return res.status(400).send({ status: false, send: "please send amount" });
//     if (amount === "") return res.status(400).send({ status: false, send: "please send amount in proper way" });
//     if (!recipes) return res.status(400).send({ status: false, send: "please send recipes" });
//     if (recipes.length === 0) return res.status(400).send({ status: false, send: "please send recipes order" });

//     // Extracting details for each recipe
    // const recipeDetails = recipes.map(async recipe => {
    //   const selectedAddOns = recipe.selectedAddOns;
    //   const addOnDetails = await Promise.all(Object.entries(selectedAddOns).map(async ([addOnId, addOn]) => {
    //     console.log("Recipe ID:", recipe.recipe_id, "recipe quantity:", recipe.quantity, "Product ID:", addOn.product_id, "Quantity:", addOn.quantity);
        
    //     const recipeFound = await Recipe.findAll({where: { id: recipe.recipe_id   }});
    //     if(!recipeFound) return res.status(400).send({ status: false, send: "please send proper recipe" });
    //     console.log("Recipe Found before:", recipeFound);
    //     if(recipeFound.quantity < recipe.quantity)  return res.status(400).send({ status: false, send: "Insufficient quantity for the recipe" });
    //     recipeFound.quantity -= recipe.quantity;
    //     await recipeFound.save();



    //     console.log("Recipe Found:", recipeFound);
    //     return {
    //       recipe_id: recipe.recipe_id,
    //       quantity: recipe.quantity,
    //     };
    //   }));
    //   return addOnDetails;
    // });

//     // Use recipeDetails as needed

//     const order = await Order.create({ amount, recipes });
//     res.status(201).json(order);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// };

const placeOrder = async (req, res) => {
  try {
    console.log("some ", req.body);
    let data = req.body;
    let { amount, recipes } = data;

    if (!amount) return res.status(400).send({ status: false, send: "please send amount" });
    if (amount === "") return res.status(400).send({ status: false, send: "please send amount in a proper way" });
    if (!recipes) return res.status(400).send({ status: false, send: "please send recipes" });
    if (recipes.length === 0) return res.status(400).send({ status: false, send: "please send recipes order" });

    const recipeDetails = recipes.map(async (recipe) => {
      const recipeFound = await Recipe.findByPk(recipe.recipe_id);
      if (!recipeFound) return res.status(400).send({ status: false, send: "please send a proper recipe" });
      if (recipeFound.quantity < recipe.quantity) return res.status(400).send({ status: false, send: "Insufficient quantity for the recipe" });
      recipeFound.quantity -= recipe.quantity;
      await recipeFound.save();
      return {
        recipe_id: recipe.recipe_id,
        quantity: recipe.quantity,
      }; 
    });
 
    const productDetails = recipes.map(async recipe => {


      const selectedAddOns = recipe.selectedAddOns;
      const createModifier = await Modifier.create({selectedAddOns});
      


      const addOnDetails = await Promise.all(Object.entries(selectedAddOns).map(async ([addOnId, addOn]) => {
        console.log("Recipe ID:", recipe.recipe_id, "recipe quantity:", recipe.quantity, "Product ID:", addOn.product_id, "Quantity:", addOn.quantity);
        const productFound = await Product.findByPk(addOn.product_id);
        if(!productFound) return res.status(400).send({ status: false, send: "please send proper recipe" });
        if(productFound.quantity < addOn.quantity)  return res.status(400).send({ status: false, send: "Insufficient quantity for the recipe" });
        productFound.quantity -= addOn.quantity;
        await productFound.save();

        return {
          recipe_id: recipe.recipe_id,
          quantity: recipe.quantity,
        };
      }));
      return addOnDetails;
    });

    const order = await Order.create({ amount, recipes });
    res.status(201).send({status:true, data : order});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};



const getAllOrders = async (req, res) => {
  try {
    console.log("some")
    const order = await Order.findAll();
    res.json(order);
  }catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
};

// Add other order-related controllers as needed

module.exports = {
  getAllOrders,placeOrder
  // Add other exports as needed
};