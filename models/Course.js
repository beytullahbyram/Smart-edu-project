const mongoose = require('mongoose');
const slugify = require('slugify')
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
    slug: {
        type:String,
        unique:true,
    }
})
CourseSchema.pre('validate',function(next){
    this.slug=slugify(this.name,{
        lower:true,
        strict:true 
    })
    next()
})


//model çevirme işlemi
const Course = mongoose.model('Course', CourseSchema);

module.exports = Course;