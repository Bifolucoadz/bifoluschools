const { Client } = require('pg');
var express = require('express');
var bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const client = new Client({
  connectionString: "postgres://jokzpjaauvnzar:182aeea99b04933bd268fabe6c82a2032e6d99f6586ed740c49e531ffcc882ac@ec2-52-207-15-147.compute-1.amazonaws.com:5432/d7rpi3hmsrqkse",
  ssl: {
	 rejectUnauthorized: false
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

myapp.get('/', function(req, res){
   res.sendFile( __dirname);
   res.sendFile(path.join(__dirname + '/schools/index.html'));
});
myapp.use(express.static(__dirname + '/schools'));
myapp.use(bodyParser.urlencoded({ extended:true }))
myapp.use(bodyParser.json());

myapp.post('/schools/signup',function(){
client.connect();

var datae = {};
var name = req.body.name;
var parents_name = req.body.parents_name;
var phone_no = req.body.phone_no;
var address = req.body.address;
var dob = req.body.dob;
var username = req.body.username;
var password = req.body.password;
var email= req.body.email;
var reg_date = req.body.reg_date;
var last_login = req.body.last_login;
var maId = 3;

var newId = respf.rows[0].id + 1;
const text = "INSERT INTO accounts(id,name,parents_name,number,address,date_of_birth,username,password,email,created_on,last_login) VALUES (DEFAULT,'"+ name +"','"+ parents_name +"','"+ phone_no +"','"+ address +"','"+ dob +"','"+ username +"','"+ password +"','"+ email +"') RETURNING id;";

client.query(text, (err, resp) => {
if (err){
datae['status']= 404;
datae['erroe'] = "Error: Problem occur when signing up...";
res.send(datae);
}else{
datae['status'] = 200;
var arr = {};
arr['name'] = name;
arr['message'] = "Your details hav been submitted successfully";
datae['data'] = arr;
res.send(datae);
}
});

});


const portr = process.env.PORT || 3000;

myapp.listen(portr);
