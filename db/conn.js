const mongoose = require('mongoose');

const connection = mongoose.connect('mongodb+srv://Ashish:Backend@cluster0.vgss5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useUnifiedTopology:true,
    useNewUrlParser:true
}).then(()=>{
    console.log("database connected")

}).catch((err)=>{
    console.log(err)
})

module.exports = connection