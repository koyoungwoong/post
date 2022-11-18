const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 

const MongoClient = require('mongodb').MongoClient

var db;
MongoClient.connect("mongodb+srv://labos:hallym@cluster0.vvtp274.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
     db = client.db('nodejs');
  // db.collection('login').insertOne({email: 'apple@hallym.ac.kr', password: "apple"}, function(err, result){
  //   console.log("save complete...");
  // });
    console.log('DB connected')

  app.listen(8080, function() {
    console.log('listening on 8080')
  })
})


app.get('/', function(req, res) { 
  res.sendFile(__dirname +'/index.html')
  })

app.get('/write', function(req, res) { 
    res.sendFile(__dirname +'/write.html')
  })

app.post('/add', function(req, res){
   db.collection('login').insertOne({email: 'apple@hallym.ac.kr', password: "apple"}, function(err, result){
     console.log("save complete...");
   });
    console.log(req.body);
    res.send('complete....')
  });
  
