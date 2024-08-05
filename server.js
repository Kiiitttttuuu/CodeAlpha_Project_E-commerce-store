const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});
const Product = mongoose.model('Product', productSchema);

// Cart Schema
const cartSchema = new mongoose.Schema({
    products: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
});
const Cart = mongoose.model('Cart', cartSchema); // Use Cart here

// API Endpoints
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

app.post('/api/cart', async (req, res) => {
    try {
        const { productId } = req.body;
        let cart = await Cart.findOne();
        if (!cart) {
            cart = new Cart({ products: [productId] });
            await cart.save();
        } else {
            cart.products.push(productId);
            await cart.save();
        }
        res.json({ message: 'Product added to cart!' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to add product to cart' });
    }
});

app.get('/api/cart', async (req, res) => {
    try {
        const cart = await Cart.findOne().populate('products');
        res.json(cart || { products: [] });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch cart' });
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
