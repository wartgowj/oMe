const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cxplaceSchema = new Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    lat: { type: String, required: true },
    lng: { type: String, required: true },
    phone: { type: String, required: true },
    commision: { type: String, required: true },
    buy: { type: Number, required: true },
    sell: { type: Number, required: true },
    hours: { type: String, required: true },
    image: { type: String, required: true },
    comments: [{ type: String}],
    user: {type: String},
    date: { type: Date, default: Date.now }
});

const Cxplace = mongoose.model("Cxplace", cxplaceSchema);

module.exports = Cxplace;

