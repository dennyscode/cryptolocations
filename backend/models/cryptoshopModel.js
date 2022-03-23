const mongoose = require('mongoose')
// const xPosSchema = new mongoose.Schema({ name: Number });
// const yPosSchema = new mongoose.Schema({ name: Number });

const cryptoshopSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    shopsiteurl: {
        type: String,
        required: [false, 'Please add a website url']
    },
    shoptype: {
        type: String,
        required: [true, 'Please choose a field']
    },
    shopcoordinates: {
        type : Array , 
        "default" : [0, 0],
        required: [true, 'Please add a text value']
    },
    shoplogourl: {
        type: String,
        required: [false, 'Please choose a Logo']
    },
    
}, {timestamps: true })

module.exports = mongoose.model('Cryptoshop', cryptoshopSchema)
