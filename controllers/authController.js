const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json({
            status: 'basarılı',
            user,
        })
    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }

}



exports.loginUser = (req, res) => {
    try {
        const {
            email,
            password
        } = req.body;

        User.findOne({
            email: email
        }, (err, user) => {
            if (user) {
                bcrypt.compare(password, user.password, (err, same) => {
                    if (same) {
                        req.session.userıd = user._id
                        res.status(200).redirect('/users/dashboard') // giriş yaptıktan sonra   ana sayfaya yönlendir 
                    }
                });
            }
        });
    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
};



exports.logoutUser = (req, res) => {
    //çıkış işlemi geldiğinde anasayfaya yönlendir
    req.session.destroy(() => {
        res.redirect('/')
    })
}



exports.getDashboardPage = async (req, res) => {
    const user = await User.findOne({
        _id: req.session.userıd
    })
    //veri tabanındaki _id si sessiiondaki idye eşit olanı dashboard ttemplatine gönder
    // if (user) {
    //     console.log('kullanııc var ');
    // } else {
    //     console.log('kullanııc yok ');
    //     res.redirect('/login')
    // }
    res.render('dashboard', {
        page_name: "dashboard",
        user
    })
}