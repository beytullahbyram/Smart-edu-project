const Category = require('../models/Category');
const Course = require('../models/Course');

exports.createCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);

        res.status(201).json({
            status: 'basarılı',
            category,
        })
    } catch (error) {
        res.status(400).json({
            status: 'hatalı',
            error,
        })
    }

}


exports.getCategoryDelete = async (req, res) => {
    try {

        await Course.findByIdAndRemove(req.params._id)
        res.status(200).redirect('/users/dashboard');

    } catch (error) {
        res.status(400).json({
            status: 'fail',
            error,
        });
    }
}