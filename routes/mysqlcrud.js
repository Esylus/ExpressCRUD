const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const mysqlCfg = require('../config/mysqlCfg');

//---------------------------------------------------Connect to mySql DB-----------------------------------

const db = mysql.createConnection(mysqlCfg.mysqlCfg);

db.connect((err) => {
    if(err) throw err;
    console.log(`mysql is connected on ${mysqlCfg.mysqlCfg.host} `);
});

//----------------------------------------------------Build table-----------------------------------------

router.get('/db', (req, res) => {
    let sql = 'CREATE DATABASE myDB';
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(err);
        res.send(result);
    });
});

router.get('/table', (req, res) => {
    let sql = 'CREATE TABLE IF NOT EXISTS myTable2 (id integer auto_increment primary key, first varchar(20), last varchar(20), age integer)';
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

router.get('/alter', (req, res) =>{
    let sql = 'ALTER TABLE myTable ADD middle varchar(20)';
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

//---------------------------------------------------Select Functionality------------------------------------

router.get('/getall', (req, res)=> {
    let sql = 'SELECT * FROM myTable';
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// use req.params when the data is part of the address
router.get('/getbyid/:id', (req,res)=>{
    let id = req.params.id;

    let sql = `SELECT * FROM myTable WHERE id = ${id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

// use req.params when the data comes after the question mark ex. /getbyrange?start=10&end=30
router.get('/getbyrange', (req,res)=>{
    let start = req.query.start;
    let end = req.query.end;

    let sql = `SELECT * FROM myTable WHERE id >= ${start} AND id <= ${end}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });

});

//---------------------------------------------------Post, Put, Delete Functionality------------------------------------

router.post('/insert', (req, res) => { 

    let person = {
        first: req.body.first,
        middle: req.body.middle,
        last: req.body.last,
        age: req.body.age
    }

    let sql = 'INSERT INTO myTable SET ?';
    let query = db.query(sql, person, (err, result) => {
        if(err) throw err;
        console.log(result);            
        res.send(result);
    });       
});

router.put('/update/:id', (req, res)=>{

    let person = {
        first: req.body.first,
        last: req.body.last,
        age: req.body.age
    }

    let sql = `UPDATE myTable SET ? WHERE id = ${req.params.id}`;
    let query = db.query(sql, person, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

router.delete('/delete/:id', (req, res)=>{
    let sql = `DELETE FROM myTable WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result)=>{
        if(err) throw err;
        console.log(result);
        res.send(result);
    });
});

router.get('/', (req, res) => {
    res.send('Found the movies mysql database');
});

module.exports = router;