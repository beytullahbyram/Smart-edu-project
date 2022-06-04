const express=require('express');
const courseController=require('../controllers/courseController');
const roleMiddleware=require('../middleware/roleMiddleware')
const router=express.Router();
//form işlemi oldugu için post kullandık
router.route('/').post(roleMiddleware(['teacher','admin']),courseController.createCourse);
router.route('/').get(courseController.getAllCourses)
router.route('/:slug').get(courseController.getCourse)
router.route('/:slug').delete(courseController.getDelete)
router.route('/:slug').put(courseController.getUpdate)
router.route('/enroll').post(courseController.getEnroll)
router.route('/release').post(courseController.getRelease)


module.exports=router;
