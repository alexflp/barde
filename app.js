
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs'); //extension of views
app.use(bodyParser.urlencoded({ extended: false }));
 
//mysql 
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit : 100, //focus it
    host : 'sdds.cgiqg4kguirw.us-west-2.rds.amazonaws.com',
    port:'3306',
    user : 'flash',
    password : 'flash123',
    database : 'ftt'
    
    
});
//opening view
 
app.get('/', function(req,res){
    res.render('index');
});
 
//insert data 
app.post('/insert', function(req,res){
    
   pool.getConnection(function(error,conn){
       
       var queryString = "insert into uu(fname,lname,email,phone) values('"+req.body.fname+"','"+req.body.lname+"','"+req.body.email+"','"+req.body.phone+"')";
       
       conn.query(queryString,function(error,results){
           if(error)
               {
                   throw error;
               }
           else 
               {
                 res.send('Inserted Successfully!')
               }
           
       });
       conn.release();
   });
    
    
});
 
 
//start server
 
module.exports = app;