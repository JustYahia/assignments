const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const BASE_API_URL = 'https://api.escuelajs.co/api/v1';


app.get('/products', async (req, res) => {
  try {
    const currencyCode = req.query.CUR || 'USD';

    
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/b40358e36ed4d64eb3a6f959/latest/USD`);
    const exchangeRate = response.data.conversion_rates[currencyCode];

    // Fetch the products from the API
    const productsResponse = await axios.get(`${BASE_API_URL}/products`);
    const products = productsResponse.data;

   
    const categorizedProducts = {};

   
    products.forEach((product) => {
      const category = product.category;

      
      const price = product.price * exchangeRate;

      if (categorizedProducts.hasOwnProperty(category.name)) {
        
        categorizedProducts[category.name].products.push({
          ...product,
          price,
        });
      } else {
        
        categorizedProducts[category.name] = {
          category,
          products: [
            {
              ...product,
              price,
            },
          ],
        };
      }
    });

    
    const categorizedProductsArray = Object.values(categorizedProducts);

   
    res.json(categorizedProductsArray);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/products', async (req, res) => {
    try {
     
      const { title, price, description, categoryId, images } = req.body;
      if (!title || !price || !description || !categoryId || !images) {
        return res.status(400).json({ error: 'Incomplete product data' });
      }
  
      
      const response = await axios.post(`${BASE_API_URL}/products`, req.body);
  
      
      const {
        title: newTitle,
        price: newPrice,
        description: newDescription,
        images: newImages,
        category,
        id,
        creationAt,
        updatedAt
      } = response.data;
  

      const transformedResponse = {
        title: newTitle,
        price: newPrice,
        description: newDescription,
        images: newImages,
        category,
        id,
        creationAt,
        updatedAt
      };
  
   
      res.json({
        sentData: req.body,
        responseData: transformedResponse
      });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  