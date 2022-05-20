const express=require('express');
const courseController=require('../controllers/courseController');
const roleMiddleware=require('../middleware/roleMiddleware')
const router=express.Router();
//form işlemi oldugu için post kullandık
router.route('/').post(roleMiddleware(['teacher','admin']),courseController.createCourse);
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
module.exports=router;
