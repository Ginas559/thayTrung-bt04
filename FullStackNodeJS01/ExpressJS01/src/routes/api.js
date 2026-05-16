const express = require('express');
const { createUser, handleLogin, getUser, getAccount } = require('../controllers/userController');
const { getProducts, getProductBySlug, createProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const delay = require('../middleware/delay');

const routerAPI = express.Router();

routerAPI.all("*", auth);

routerAPI.get("/", (req, res) => {
    return res.status(200).json("Hello world api")
})

routerAPI.post("/register", createUser);
routerAPI.post("/login", handleLogin);

routerAPI.get("/user", getUser);
routerAPI.get("/account", delay, getAccount);
routerAPI.get("/products", getProducts);
routerAPI.get("/products/:slug", getProductBySlug);

// Admin product management
routerAPI.post('/admin/products', admin, createProduct);
routerAPI.put('/admin/products/:id', admin, updateProduct);
routerAPI.delete('/admin/products/:id', admin, deleteProduct);

module.exports = routerAPI;