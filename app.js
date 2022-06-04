const express = require('express');
const mongoose=require('mongoose');
const  session  =  require ( 'express-session' )
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const methodOverride = require('method-override')


const router = require('./routes/pageRoute');
const courseRoute=require('./routes/courseRoute');
const categoryRoute=require('./routes/categoryRoute');
const userRoute=require('./routes/userRoute');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://User-db:uIFAPsX0Xfc8gEXV@cluster0.bbamebs.mongodb.net/?retryWrites=true&w=majority').then(()=>{
    console.log('Connect');
})


app.set("view engine", "ejs")

 


//statik dosyalar public klasorunde
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://User-db:uIFAPsX0Xfc8gEXV@cluster0.bbamebs.mongodb.net/?retryWrites=true&w=majority' }) //oturumu kayıt altına aldı// mongoose de session olusturuldu
  }))
app.use(flash());
app.use((req,res,next)=>{
    res.locals.flashMessages=req.flash();
    next();
})
app.use(methodOverride('_method',{
    methods:['POST','GET'] 
}))

//router
app.use('*',(req,res,next) => {
    userIN = req.session.userıd;
    next();
})
app.use('/',router)
app.use('/courses',courseRoute)
app.use('/categories',categoryRoute);
app.use('/users',userRoute)

app.listen(port, () => {
    console.log(`Uygulama ${port} portunda başlatıldı`);
})