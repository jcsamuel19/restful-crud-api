const mongoose = require('mongoose') // anytime we interact with DB we must include this
const productSchema = mongoose.Schema( // must have a schema in a model
    { // create an object 
        name: {
            type: String,
            required: [true, "Please enter a product name"]
        },
        quantity: {
            type: Number,
            required: true,
            default: 0
        },
        price: {
            type: Number,
            required: true,
            default: 0
        },
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true // tracks data that is saved to DB and when data is motified
    }
)
const Product = mongoose.model('Product', productSchema) // create a new model
module.exports = Product; // exporting product