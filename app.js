const express = require('express')
const router = require('./routes/pageRoute');
const app = express();
const port = 3000;
//temlate-şablon engine
app.set("view engine", "ejs")

//ara katman middleware
//statik dosyalar public klasorunde
app.use(express.static("public"))

//router - yönlendirmeler
app.use('/',router)


app.listen(port, () => {
    console.log(`Uygulama ${port} portunda başlatıldı`);
})