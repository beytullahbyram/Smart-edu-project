const Course = require('../models/Course');
const Category = require('../models/Category');
const User = require('../models/User');

exports.createCourse = async (req, res) => {
    try {

        const course = await Course.create({
            name: req.body.name,
            desctription: req.body.desctription,
            category: req.body._id,
            user: req.session.userıd
        });


        res.status(201).redirect('/courses');
    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }


}

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug = req.query.categories
        const category = await Category.findOne({
            slug: categorySlug
        })
        const query=req.query.search
        let filter = {};

        if (categorySlug) {
            //kurs modelincedki kategori
            filter = {
                category: category._id
            }
        }

        if(query){
            filter={name:query}
        }
        if(!query && !categorySlug){
            filter.name="",
            filter.categories=null
        }

        const courses = await Course.find({
            $or:[
                {name:{$regex:'.*'+filter.name +'.*', $options:'i' }},
                {category:filter.category}
            ]
        });
        const categories = await Category.find();
        res.status(200).render('courses', {
            courses,
            categories,
            page_name: "courses"

        })
    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }


}

exports.getCourse = async (req, res) => {
    try {
        const user=await User.findById(req.session.userıd)
        const course = await Course.findOne({
            slug: req.params.slug
        }).populate('user') //user modelindeki bilgileri aldık

        res.status(200).render('course', {
            course,
            page_name: "courses",
            user
        })

    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }
}


exports.getEnroll = async (req, res) => {
    try {
        const user = await User.findById(req.session.userıd)
        await user.courses.push({_id: req.body.course_id}) //userın kurslar alanına yeni bir kurs ekleniyor. req ile ejsdeki kurs idyi alarak.
        await user.save() //buralarda await yazmamızın sebebi bu işlemlerin sıralı bir şekilde olmasını istediğimiz için.
       
     res.status(200).redirect('/users/dashboard')

    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }
}

exports.getRelease = async (req, res) => {
    try {
        const user = await User.findById(req.session.userıd)
        await user.courses.pull({_id: req.body.course_id}) //userın kurslar alanına yeni bir kurs ekleniyor. req ile ejsdeki kurs idyi alarak.
        await user.save() //buralarda await yazmamızın sebebi bu işlemlerin sıralı bir şekilde olmasını istediğimiz için.
       
     res.status(200).redirect('/users/dashboard')

    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }
}