const express = require('express')
const app = express();
const port = 3000;
//temlate-şablon engine
app.set("view engine", "ejs")

//ara katman middleware
//statik dosyalar public klasorunde
app.use(express.static("public"))

//router - yönlendirmeler
app.get('/', (req, res) => {
    res.render('index', {
        page_name: "index"
    })
})

app.get('/about', (req, res) => {
    res.render('about',{
        page_name:"about"  //template engine değişken gönderilir
    })
})






app.listen(port, () => {
    console.log(`Uygulama ${port} portunda başlatıldı`);
})