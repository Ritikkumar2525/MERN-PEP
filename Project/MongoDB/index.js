import express from 'express';
import mongoose from 'mongoose';

const app = express();

mongoose.connect('mongodb://localhost:27017/shopDB')
    .then(()=>{console.log("MongoDB connected")});

const productSchema = new mongoose.Schema({
    name: String,
    price: Number
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) =>{
    const page = parseInt(req.query.page) || 1;

    const limit = 4;

    const skip = (page - 1) * limit;

    const products = await 
    Product.find({}, {name: 1, _id: 0})
           .sort({name: 1})
           .skip(skip)
           .limit(limit);
        res.json({
            page,
            data: products
        });
});


app.listen(3000, () => {
    console.log("Server running at http://localhost:3000");
});