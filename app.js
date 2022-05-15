const express = require('express');
const mongoose=require('mongoose');
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

//ara katman middleware
//statik dosyalar public klasorunde
app.use(express.static("public"))
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
//router - yönlendirmeler
app.use('/',router)
app.use('/courses',courseRoute)
app.use('/categories',categoryRoute);
app.use('/users',userRoute)

app.listen(port, () => {
    console.log(`Uygulama ${port} portunda başlatıldı`);
})