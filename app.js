const express = require("express")
const path = require("path");
const app = express();
const bodyparser = require("body-parser")
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/dance', {useNewUrlParser: true});
const port=8000;

//Define mongoose schema
var contactSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  addrress: String,
  desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

//Express specific stuff
app.use('/static', express.static('static')) //for serving static file
app.use(express.urlencoded())

//Pug specific stuff
app.set('view engine', 'pug') //set the templete engine as pug
app.set('views', path.join(__dirname,'views')) //set the view directory

//endpoints
app.get('/', (req,res)=>{
  const params = { }
  res.status(200).render('home.pug',params);
})

app.get('/contact', (req,res)=>{
  const params = { }
  res.status(200).render('contact.pug',params);
})

//post request
app.post('/contact', (req,res)=>{
  var myData = new Contact(req.body);
  myData.save().then(()=>{
    res.send("<h1>We will contact you soon :)</h1>")
  }).catch(()=>{
    res.status(400).send("Iteam is not saved to the database")
  })

  //res.status(200).render('contact.pug');
})


////start the server
app.listen(port, ()=>{
  console.log(`The appication started successfully on port ${port}`);
});
