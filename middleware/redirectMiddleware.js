module.exports = (req, res, next) => {
    //kullanıcının olup olmadığını kontrol etme
    if (req.session.userıd) {
        return res.redirect('/')
    }
    next();
}