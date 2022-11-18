const express = require('express');
const app = express();
app.use(express.urlencoded({extended: true})) 
const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({extended: true})) 
var db;

const MongoClient = require('mongodb').MongoClient
app.set('view engine', 'ejs');

MongoClient.connect("mongodb+srv://labos:hallym@cluster0.vvtp274.mongodb.net/?retryWrites=true&w=majority", function(err, client){
  if (err) return console.log(err)
     db = client.db('nodejs');

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

app.get('/list', function(req, res) {
  db.collection('login').find().toArray(function(err, result){
    console.log(result);
    res.render('list.ejs')
  })
})

app.post('/add', function(req, res){
    db.collection('login').insertOne({email:req.body.email, password: req.body.password}, function(err, result){
      if(err) return console.log("error");
      console.log("save complete...");
      console.log(req.body.email);
      console.log(req.body.password);
    })
    res.send('send complete.....')
  })
