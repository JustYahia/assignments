
let products = [];

// Controller
const productController = {
 
  getProducts: (req, res) => {
    res.json(products);
  },

  
  getProductById: (req, res) => {
    const { id } = req.params;
    const product = products.find((p) => p.id === id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  },

  
  createProduct: (req, res) => {
    const { name, price } = req.body;

    
    if (!name || !price) {
      res.status(400).json({ error: 'Invalid product object' });
      return;
    }

    const newProduct = { id: Date.now().toString(), name, price };
    products.push(newProduct);
    res.status(201).json(newProduct);
  },

  
  updateProduct: (req, res) => {
    const { id } = req.params;
    const { name, price } = req.body;

    
    if (!name || !price) {
      res.status(400).json({ error: 'Invalid product object' });
      return;
    }

    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      const updatedProduct = { id, name, price };
      products[productIndex] = updatedProduct;
      res.json(updatedProduct);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  },

  
  deleteProduct: (req, res) => {
    const { id } = req.params;
    const productIndex = products.findIndex((p) => p.id === id);
    if (productIndex !== -1) {
      products.splice(productIndex, 1);
      res.sendStatus(204);
    } else {
      res.status(404).json({ error: 'Product not found' });
    }
  },
};

// View (Routes)
const express = require('express');
const app = express();
app.use(express.json());


app.get('/products', productController.getProducts);


app.get('/products/:id', productController.getProductById);


app.post('/products', productController.createProduct);


app.put('/products/:id', productController.updateProduct);


app.delete('/products/:id', productController.deleteProduct);


app.listen(5500, () => {
  console.log('Server is listening on port 5500');
});
