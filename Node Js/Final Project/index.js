const express = require('express');
const app = express();


const users = [];


const categories = [];


const products = [];


app.use(express.json());

// User registration endpoint
app.post('/registration', (req, res) => {
  const { email, password, passwordRepeat } = req.body;

  // Validate email format
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  // Validate password
  if (!isValidPassword(password)) {
    return res.status(400).json({ error: 'Invalid password format' });
  }

  
  if (password !== passwordRepeat) {
    return res.status(400).json({ error: 'Passwords do not match' });
  }


  const token = generateToken();

  // Create a new user 
  const user = {
    email,
    password,
    token,
  };

  
  users.push(user);

  res.json({ success: true });
});

// User login endpoint
app.post('/login', (req, res) => {
  const { email, password } = req.body;

 
  const user = users.find((user) => user.email === email);

 
  if (!user || user.password !== password) {
    return res.status(401).json({ error: 'Invalid email or password' });
  }

  res.json({
    email: user.email,
    password: user.password,
    token: user.token,
  });
});

// Categories endpoints
app.post('/category', authenticateUser, (req, res) => {
  const { name } = req.body;

  // Validate name
  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Invalid category name' });
  }

  
  const id = generateId();

  // Create a new category 
  const category = {
    id,
    name,
  };

  
  categories.push(category);

  res.json(category);
});

app.put('/category/:id', authenticateUser, (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  // Validate name
  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Invalid category name' });
  }

  
  const category = categories.find((category) => category.id === id);

 
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

 
  category.name = name;

  res.json(category);
});

app.get('/category', authenticateUser, (req, res) => {
  res.json(categories);
});

app.get('/category/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  
  const category = categories.find((category) => category.id === id);

  
  if (!category) {
    return res.status(404).json({ error: 'Category not found' });
  }

  res.json(category);
});

app.delete('/category/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  
  const categoryIndex = categories.findIndex((category) => category.id === id);

  
  if (categoryIndex === -1) {
    return res.status(404).json({ error: 'Category not found' });
  }

  // Remove category from the array
  const deletedCategory = categories.splice(categoryIndex, 1)[0];

  res.json(deletedCategory);
});

// Products endpoints
app.post('/products', authenticateUser, (req, res) => {
  const { name, price, category_id } = req.body;

  // Validate name
  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Invalid product name' });
  }

  // Validate price
  if (typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid price' });
  }

  // Find category by id
  const category = categories.find((category) => category.id === category_id);

  // Check if category exists
  if (!category) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  
  const id = generateId();

  // Create a new product 
  const product = {
    id,
    name,
    price,
    category_id,
  };


  products.push(product);

  res.json(product);
});

app.put('/products/:id', authenticateUser, (req, res) => {
  const { id } = req.params;
  const { name, price, category_id } = req.body;

  // Validate name
  if (!isValidName(name)) {
    return res.status(400).json({ error: 'Invalid product name' });
  }

  // Validate price
  if (typeof price !== 'number') {
    return res.status(400).json({ error: 'Invalid price' });
  }

  // Find product by id
  const product = products.find((product) => product.id === id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Find category by id
  const category = categories.find((category) => category.id === category_id);

  // Check if category exists
  if (!category) {
    return res.status(400).json({ error: 'Invalid category' });
  }

  // Update product details
  product.name = name;
  product.price = price;
  product.category_id = category_id;

  res.json(product);
});

app.get('/products', authenticateUser, (req, res) => {
  res.json(products);
});

app.get('/products/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  // Find product by id
  const product = products.find((product) => product.id === id);

  // Check if product exists
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  res.json(product);
});

app.delete('/products/:id', authenticateUser, (req, res) => {
  const { id } = req.params;

  // Find index of product by id
  const productIndex = products.findIndex((product) => product.id === id);

  // Check if product exists
  if (productIndex === -1) {
    return res.status(404).json({ error: 'Product not found' });
  }

  // Remove product from the array
  const deletedProduct = products.splice(productIndex, 1)[0];

  res.json(deletedProduct);
});

// Middleware to authenticate user
function authenticateUser(req, res, next) {
  const token = req.headers.authorization;

  // Find user by token
  const user = users.find((user) => user.token === token);

  // Check if user exists
  if (!user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  next();
}

// Helper function to validate email format
function isValidEmail(email) {
  // Use a regex pattern to validate email format
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Helper function to validate password format
function isValidPassword(password) {
  const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
  return passwordPattern.test(password);
}


function generateToken() {
  // Generate a random string as the token
  return Math.random().toString(36).substr(2);
}


function generateId() {
  // Generate a random string as the ID
  return Math.random().toString(36).substr(2);
}

// Start the server
app.listen(5500, () => {
  console.log('Server started on port 5500');
});
