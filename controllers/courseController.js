const Course = require('../models/Course');
const Category = require('../models/Category');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            status: 'basarılı',
            course,
        })
    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }


}

exports.getAllCourses = async (req, res) => {
    try {
        const categorySlug=req.query.categories
                    //async
        const category = await Category.findOne({slug:categorySlug})
        let filter={};

        if(categorySlug){
            //kurs modelincedki kategori
            filter={category:category._id}
        }

        const courses = await Course.find(filter);
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
        const course = await Course.findOne({
            slug: req.params.slug
        });

        res.status(200).render('course', {
            course,
            page_name: "courses"

        })

    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }
}