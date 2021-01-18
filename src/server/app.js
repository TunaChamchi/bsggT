const express = require('express');
const bodyParser = require('body-parser');
var cors = require('cors');
const port = 3001;
const connect = require('./schemas');
const talk = require('./routes/Talk');

const app = express();

connect();

app.use(cors());
app.use(bodyParser.json());
app.use('/api/talk', talk);
app.use('/uploads', express.static('uploads'));

app.listen(port, ()=>{
    //console.log(`express is running on ${port}`);
})