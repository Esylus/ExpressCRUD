const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const mysqlcrud = require('./routes/mysqlcrud');
const mongocrud = require('./routes/mongocrud');

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cors());

app.use('/mysqlcrud', mysqlcrud);
app.use('/mongocrud', mongocrud);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res)=>{
    res.send('Found the server - letssssss go!');
});

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`);
});