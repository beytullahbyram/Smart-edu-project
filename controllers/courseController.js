const Course = require('../models/Course');

exports.createCourse = async (req, res) => {
    try {
        const course = await Course.create(req.body);

        res.status(201).json({
            status: 'basarılı',
            course,
        })
    } catch(error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }


}

exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find();

        res.status(200).render('courses',{
            courses,
            page_name: "courses"

        })
    } catch(error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }


}