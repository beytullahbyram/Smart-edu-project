const User = require('../models/User');
const Category = require('../models/Category');


const bcrypt = require('bcrypt');
const Course = require('../models/Course');

exports.createUser = async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).redirect('/login')
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

    const courseCategory=await Category.find();
    const course=await Course.find({
        user:req.session.userıd
    });
    console.log(courseCategory[0]._id);
    console.log(course);

    res.render('dashboard', {
        page_name: "dashboard",
        user,
        courseCategory,
        course
    })
}