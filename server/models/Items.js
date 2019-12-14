const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
    businessName: String,
    phone: String,
    address: String,
    price: String,
    rating: String,
    yelpURL: String
});

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;