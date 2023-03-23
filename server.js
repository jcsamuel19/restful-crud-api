const { request, response } = require('express')
const express = require('express') //create variable to allow express to be accessed
const mongoose = require('mongoose')
const Product = require('./models/productModel') //import product model
const app = express()

app.use(express.json()) //So our application can understand json files
app.use(express.urlencoded({extended: false}))//so application understands urlencooded 
//routes - request: what clients send, respond: what you respond back to the client
app.get('/', (req,res) => {
    res.send('Hello Node API')
}) 

// different page extensions ex:/blog 
app.get('/blog', (req,res) => {
    res.send('Hello Blog')
}) 

app.get('/products', async(req,res) => {
    try {
        const products = await Product.find({}); //finding all products
        res.status(200).json(products)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

app.get('/products/:id', async(req,res) => { // Finding product by ID
    try {
        const {id} = req.params;
        const product = await Product.findById(id); //finding product by id
        res.status(200).json(product)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

app.post('/product', async(req,res) => { // use async and await when interacting with DB 
    try {
        const product = await Product.create(req.body) // save productModel data to DB through creating new Product
        res.status(200).json(product); // response data that we saved in DB
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req,res) => { 
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id,req.body); //finding product by id and updating (id,data we want to update it with)
        if(!product){ // we can not find product if DB
            return res.status(404).json({message: `We can not find any product with ID: ${id}`})
        } 
        const updateProduct = await Product.findById(id); // 
        res.status(200).json(updateProduct)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})  

// delete a product
app.delete('/products/:id' , async(req,res) => {
try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id); //finding product by id
    if(!product){ // we can not find product if DB
        return res.status(404).json({message: `We can not find any product with ID: ${id}`})
    } 
    res.status(200).json(product) // shows us the product that was deleted
} catch (error){
    res.status(500).json({message: error.message})
}
}) 

// connecting to MongoDB admin:password
mongoose.connect('Mongo DB API Key')
.then(()=> {
    console.log('Connected to MongoDB')
    app.listen(3000, ()=> {
        console.log("API app is running on port 3000")
    })
}).catch((error) => {
    console.log(error)
})