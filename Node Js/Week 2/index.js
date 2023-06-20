const fs = require('fs');
const axios = require('axios');

async function convertPrices() {
  try {
    
    const response = await axios.get('https://v6.exchangerate-api.com/v6/b40358e36ed4d64eb3a6f959/latest/USD');
    const exchangeRate = response.data.conversion_rates.EGP;

    
    const productsResponse = await axios.get('https://api.escuelajs.co/api/v1/products');
    const products = productsResponse.data;

    
    const categorizedProducts = {};

  
    products.forEach((product) => {
      const category = product.category;

     
      const priceInEGP = product.price * exchangeRate;

      if (categorizedProducts.hasOwnProperty(category.name)) {
        
        categorizedProducts[category.name].products.push({
          ...product,
          price: priceInEGP,
        });
      } else {
       
        categorizedProducts[category.name] = {
          category: category,
          products: [
            {
              ...product,
              price: priceInEGP,
            },
          ],
        };
      }
    });

    
    const categorizedProductsArray = Object.values(categorizedProducts);

    
    fs.writeFile('categorized_products.txt', JSON.stringify(categorizedProductsArray), 'utf8', (err) => {
      if (err) {
        console.error('Error writing to file:', err);
      } else {
        console.log('Categorized products written to categorized_products.txt');
      }
    });
  } catch (error) {
    console.error('Error:', error);
  }
}


convertPrices();
