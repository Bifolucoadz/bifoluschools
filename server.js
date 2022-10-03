const { Client } = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require = ('jsonwebtoken');
const client = new Client({
  connectionString: "postgres://jokzpjaauvnzar:182aeea99b04933bd268fabe6c82a2032e6d99f6586ed740c49e531ffcc882ac@ec2-52-207-15-147.compute-1.amazonaws.com:5432/d7rpi3hmsrqkse",
  ssl: {
     rejectUnauthorized : false,
  },
}) 

client.connect();

var myapp = express();
const path = require('path');
const router = express.Router(); 

myapp.use(function(req, res, next){
req.headers['content-type'] = "application/json"; 
next();
});

myapp.get('/', function(req, res) {
   res.sendFile( __dirname);
   res.sendFile(path.join(__dirname + '/UI/index.html'));
});
myapp.use(express.static(__dirname + '/UI'));
myapp.use(bodyParser.urlencoded({ extended:true }))
myapp.use(bodyParser.json());


const portr = process.env.PORT || 3000;

myapp.listen(portr);
