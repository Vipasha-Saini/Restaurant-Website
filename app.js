const express = require("express");
const path = require("path");
const app = express();
const dotenv = require("dotenv");
const port = process.env.PORT || 3000;
const mongoose = require("mongoose");
const uri = process.env.MONGODB_URI;
var cons = require('consolidate');


dotenv.config({ path:'config.env' });

const DB = process.env.DATABASE;

mongoose.connect(DB, {useNewUrlParser: true,useUnifiedTopology: true});


const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    message: String
});

const Contact = mongoose.model('Customer', contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded())

// view engine setup
app.engine('html', cons.swig)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

app.get('/',(req, res)=>{
    const params = {}
    res.status(200).render('home.html', params);
})
app.post('/', (req, res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{
        res.render('thankyou.html')
    }).catch(()=>{
        res.status(400).send("Please Try Again")
    });
}) 


app.listen(port, ()=>{
    console.log(`The application started successfully on port ${port}`);
});
