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
    },
    courses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Course'
      }]
})
//password veri tabanına gitmeden önce ara katman oluşturup veri tabanına yazılmadan önce şifreliyoruz
UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) return next();

    bcrypt.genSalt(10, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt,     function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});


//model çevirme işlemi
const User = mongoose.model('User', UserSchema); //'User' kelimesi ile diğer modellerden referans alabiliyoruz

module.exports = User;