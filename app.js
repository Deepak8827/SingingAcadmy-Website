const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactSing', {useNewUrlParser: true, useUnifiedTopology: true});
const port =9000;

//mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    sname: String,
    desc: String,
  })
  const Contact = mongoose.model('Contact', contactSchema);

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory
// ENDPOINTS
app.get('/', (req, res)=>{
    const params = {}
    res.status(200).render('home.pug', params);
})
app.get('/contact', (req, res)=>{ 
    const params = {}
    res.status(200).render('contact.pug');
})

app.post('/contact', (req, res)=>{ 
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("This item has been saved successfully")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
   // res.status(200).render('contact.pug', params);
})

app.get('/about', (req, res)=>{ 
    const params = {}
    res.status(200).render('about.pug');
})
app.get('/service', (req, res)=>{ 
    const params = {}
    res.status(200).render('service.pug');
})
app.get('/classinfo', (req, res)=>{ 
    const params = {}
    res.status(200).render('classinfo.pug');
})


  

// Start the server   
app.listen(port,()=>{
    console.log(`This application strat sucessfully pn port${port}`)
}) 


