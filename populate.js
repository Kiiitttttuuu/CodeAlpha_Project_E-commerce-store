const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Product Schema
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    image: String,
});
const Product = mongoose.model('Product', productSchema);

// Sample Data
const products = [
    {
        name: 'Product 1',
        price: 29.99,
        image: 'https://via.placeholder.com/200?text=Product+1',
    },
    {
        name: 'Product 2',
        price: 49.99,
        image: 'https://via.placeholder.com/200?text=Product+2',
    },
    {
        name: 'Product 3',
        price: 19.99,
        image: 'https://via.placeholder.com/200?text=Product+3',
    },
    {
        name: 'Product 4',
        price: 99.99,
        image: 'https://via.placeholder.com/200?text=Product+4',
    },
];

// Insert Data
const insertData = async () => {
    try {
        await Product.deleteMany({}); // Clear existing data
        await Product.insertMany(products); // Insert sample data
        console.log('Sample data inserted successfully!');
    } catch (error) {
        console.error('Error inserting data:', error);
    } finally {
        mongoose.connection.close(); // Close the connection
    }
};

insertData();
