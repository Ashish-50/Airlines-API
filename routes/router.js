const { application } = require('express');
const express = require('express');
const router = express.Router();
const Airline = require('../model/airlineSchema')
const Passanger = require('../model/passangerSchema')


//get all airlines details
router.get('/airlines',async(req,res)=>{
    const getall = await Airline.find();
    res.status(200).send(getall);
});


//creating airline
router.post('/airlines',async(req,res)=>{
    try{
    const addairline = new Airline(req.body)
    const savingairline = await addairline.save()
    console.log(savingairline)
    res.send(`Airline added named ${req.body.name}`)
    } catch(error){
        console.log(error)
    }
});


//getting individual airline details
router.get('/airlines/:id', async(req,res)=>{
    try {
        const getone = await Airline.findOne({_id:req.params.id})
        res.send(getone)

    } catch (error) {
        console.log(error)
    }
});

//getting all passangers with airline details
router.get('/passangers',async(req,res)=>{
    const getall = await Passanger.find().populate('airline');
    console.log(getall)
    res.status(200).send(getall)
})

// creating passangers 
router.post('/passangers',async(req,res)=>{
    try{
    const addpassanger = new Passanger(req.body)
    const savingpassanger = await addpassanger.save()
    console.log(savingpassanger)
    res.send(`passanger added named ${req.body.name}`)
    }catch(error){
        console.log(error)
    }
});

//getting individual passanger without airline details
router.get('/passangers/:id', async(req,res)=>{
    try {
        const getone = await Passanger.findOne({id:req.params.id})
        res.send(getone)

    } catch (error) {
        console.log(error)
    }
});

//deleting passanger with passanger id
router.delete('/passangers/:id',async(req,res)=>{
    try {
        Passanger.remove({_id:req.params.id})
        res.send("Passangers data deleted successfully....")
    } catch (error) {
        console.log(error)
    }
});

//updating name of passangers with put
//put http verb update the whole entry of details

router.put('/passangers/:id',(req,res)=>{
    Passanger.findOneAndUpdate({id:req.params.id},{
        $set:{
            name:req.body.name,
            trips:req.params.trips,
            airline:req.params.airline
        }
    },
    (err,doc)=>{
        if(err){console.log("Something wrong When updating data!")}
        else{console.log(doc)}
    })
    .then(result=>{
        res.status(200).send("updation complete")
        console.log(result)
    })
    .catch((err)=>{
        res.send(500).send(err)
        console.log(err)
    })
    
});

router.patch("/passangers/:id",async(req,res)=>{
    try {
        const getone = await Passanger.findByIdAndUpdate(req.params.id,req.body)
        console.log(getone)
        .then(result=>{
            res.status(200).send("updation through patch")
        }).catch(err=>{
            console.log(err)
        })
    } catch (error) {
        res.status(400).send('Something went wrong')
    }
});

router.get('/passanger', async(req,res)=>{
try {
    let {page,size} =req.query;
    if(!page){
        page=1
    }
    if(!size){
        size=5
    }
    const limit = parseInt(size)
    const skip = (page-1)*size
    const totalPassanger = await Passanger.find().count();
    const totalPage = Math.ceil(totalPassanger / limit)
    
    const result = await Passanger.find().limit(limit).skip(skip)
    const results = {
        "totalPassanger":totalPassanger,
        "totalPage":totalPage,
        result
    }
    res.send(results)
} catch (error) {
    res.status(500).send(console.log(error))
}










})

module.exports = router