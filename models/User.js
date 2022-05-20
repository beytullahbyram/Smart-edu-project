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
    role:{
        type:String,
        enum:['teacher','student','admin'],
        default:'student'
    }
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
const User = mongoose.model('User', UserSchema); //'User' kelimesi ile diğer modellerden referans alabiliyoruz

module.exports = User;