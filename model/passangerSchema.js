const mongoose = require('mongoose');
let Schema = mongoose.Schema

const passangerschema = Schema({
    name:{type:String},
    trips:{type:Number},
    airline:{type:Schema.Types.Number,ref:'Airline'}
})


const Passanger = mongoose.model('Passanger',passangerschema)
module.exports = Passanger