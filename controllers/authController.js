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

    const {
        email,
        password
    } = req.body;
    const user = User.findOne({
        email
    });
    if (user) {
        bcrypt.compare(password, user.password, (err, same) => {
                if (same) {
                    res.status(200).send("Yayyyyy, you're logged in :)");
                }else{
                    res.status(400).send("hatalı");
                }
            
        })
    }
}