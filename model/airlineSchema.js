const mongoose = require('mongoose');
let Schema = mongoose.Schema

const airlineSchema = Schema({
    _id:{type:Number},
    name:{type:String,},
    country:{type:String,},
    logo:{type:String},    
    slogan:{type:String,},
    head_quaters:{type:String,},
    website:{type:String,},
    established:{type:Number,}
});


const Airline = mongoose.model('Airline',airlineSchema)

module.exports = Airline