const User = require('../models/User');

module.exports = (req, res, next) => {
    //kullanıcının olup olmadığı kontrol ediliyor.
    //User için idsi sessionda ki id ile olan kullanıcıyı bize döndür. kullanıcı yoksa err kullanıcı varsa userı döndür
    User.findById(req.session.userıd, (err, user) => {
        if(err || !user) return res.redirect('/login')
        //hata varsa veya kayıtlı kullanıcı yoksa login sayfasına yönlendir
        next();
    });
}