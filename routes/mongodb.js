const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const config = require('../config/mongodbCfg');
// const Person = require('../models/Person.Model');

//-------------------------------------Connection-------------
const db = 'mongodb://localhost/Persons';

mongoose.connect(db);

mongoose.connection.on('connected', ()=>{
    console.log('Connected to database' + db);
});

mongoose.connection.on('error', (err)=>{
    console.log('Database error' + err);
});

//------------------------------------Schema-------------------

const PersonSchema = mongoose.Schema({
    first: String,
    last: String,
    middle: String,
    age: Number
});

var Person = module.exports = mongoose.model('Person', PersonSchema);

//------------------------------------End points------------------

router.get('/getall', (req,res)=>{
    Person.find({}, (err, result)=>{
        res.send(result);
    });
});

router.get('/getone/:name', (req,res)=>{
    let name = req.params.name;
    Person.find({first: name}, (err, result)=>{
        res.send(result);
    });
});

router.post('/post', (req,res)=>{
    let newPerson = new Person({
        first:req.body.first,
        last:req.body.last,
        middle:req.body.middle,
        age:req.body.age
    });
    newPerson.save((err, result)=>{
        if(err) return console.error(err);
        res.send('New Person Added');
    });
});

router.put('/put/:name', (req, res)=>{
    let name = req.params.name;
    let query = {first: name};

    let updatePerson = {
        first:req.body.first,
        last:req.body.last,
        middle:req.body.middle,
        age:req.body.age
    };

    Person.findOneAndUpdate(query, updatePerson, (err, result)=>{
        if(err) return console.error(err);
        res.send('Updated');
    });
});

router.delete('/delete/:name', (req,res)=>{
    let name = req.params.name;
    let query = {first: name};
    Person.deleteOne(query, (err, result)=>{
        if(err) console.error(err);
        res.send('Deleted');
    });
});


router.get('/', (req,res)=>{
    res.send('Found mongoose');
});




module.exports = router;