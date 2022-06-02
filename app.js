const express = require('express');
const mongoose=require('mongoose');
const  session  =  require ( 'express-session' )
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

const router = require('./routes/pageRoute');
const courseRoute=require('./routes/courseRoute');
const categoryRoute=require('./routes/categoryRoute');
const userRoute=require('./routes/userRoute');

const app = express();
const port = 3000;

//db bağlantısı
mongoose.connect('mongodb://localhost/smart-edu-db').then(()=>{
    console.log('baglantı yapıldı');
})


//temlate-şablon engine
app.set("view engine", "ejs")

 


//statik dosyalar public klasorunde
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: 'mongodb://localhost/smart-edu-db' }) //oturumu kayıt altına aldı// mongoose de session olusturuldu
  }))
app.use(flash());
app.use((req,res,next)=>{
    res.locals.flashMessages=req.flash();
    next();
})


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