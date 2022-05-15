const Category = require('../models/Category');

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