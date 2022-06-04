const express=require('express');
const categoryController=require('../controllers/category.js');


const router=express.Router();
router.route('/').post(categoryController.createCategory) //localhost:3000/categories
router.route('/:_id').delete(categoryController.getCategoryDelete)
router.route('/').post(categoryController.createCategory)

module.exports=router
