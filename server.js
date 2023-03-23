const { request, response } = require('express')
const express = require('express') //create variable to allow express to be accessed
const mongoose = require('mongoose') // anytime we interact with DB we must include this
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

// show all products
app.get('/products', async(req,res) => { // use async and await when interacting with DB 
    try { // When an await keyword is used in an async function, it tells the function to wait for the result of the promise before continuing to execute the next line of code.
        const products = await Product.find({}); //finding all products
        res.status(200).json(products)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

// Finding product by ID
app.get('/products/:id', async(req,res) => { 
    try {
        const {id} = req.params; // client sends ID
        const product = await Product.findById(id); //finding product by id
        res.status(200).json(product) // response with product with that ID
    } catch (error){
        res.status(500).json({message: error.message})
    }
})

// post a product
app.post('/product', async(req,res) => { 
    try {
        const product = await Product.create(req.body) // Creating new Product object based on client input
        res.status(200).json(product); // response data that we saved in DB
    } catch (error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
})

// update a product
app.put('/products/:id', async(req,res) => { 
    try {
        const {id} = req.params; // client sends ID
        const product = await Product.findByIdAndUpdate(id,req.body); //finding product by id and updating (id,data we want to update in the object)
        if(!product){ // if we can not find product if DB
            return res.status(404).json({message: `We can not find any product with ID: ${id}`})
        } 
        const updateProduct = await Product.findById(id); // new Product with ID of old product
        res.status(200).json(updateProduct)
    } catch (error){
        res.status(500).json({message: error.message})
    }
})  

// delete a product
app.delete('/products/:id' , async(req,res) => {
try {
    const {id} = req.params;
    const product = await Product.findByIdAndDelete(id); //finding and delete product by id
    if(!product){ // if we can not find product if DB
        return res.status(404).json({message: `We can not find any product with ID: ${id}`})
    } 
    res.status(200).json(product) // shows us the product that was deleted
} catch (error){
    res.status(500).json({message: error.message})
}
}) 

// connecting to MongoDB admin:password
mongoose.connect('Mongo DB API Key')
// Show us if we are conected and where we are connected
.then(()=> {
    console.log('Connected to MongoDB') 
    app.listen(3000, ()=> {
        console.log("API app is running on port 3000")
    })
}).catch((error) => {
    console.log(error)
})