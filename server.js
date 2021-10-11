const express = require('express');
const router = require('./routes/router');
const app = express();
const port = process.env.PORT ||8080;
require('./db/conn')

app.use(express.json())


app.use('/v1',router)


app.listen(port,()=>{
    console.log(`server started at port ${port}`)
})