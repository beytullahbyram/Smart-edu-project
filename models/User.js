const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;
//şablon oluşturma
const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
})
//password veri tabanına gitmeden önce ara katman oluşturup veri tabanına yazılmadan önce şifreliyoruz
UserSchema.pre('save',function(next){
    const user=this;
    bcrypt.hash(user.password, 10, (error,hash) => {
        user.password=hash
        next()
    })

})


//model çevirme işlemi
const User = mongoose.model('User', UserSchema);

module.exports = User;