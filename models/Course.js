const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//şablon oluşturma
const CourseSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    desctription: {
        type: String,
        required: true,
        trim: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
})

//model çevirme işlemi
const Course=mongoose.model('Course',CourseSchema);

module.exports=Course;