const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const validator = require('../../validator/validation');
const auth = require('../../middleware/auth');
const planController  = require('../../controllers/mobile/planController');

router.post('/add', multipartMiddleware, planController.addPlanName );
router.put('/update/:id', multipartMiddleware, planController.updatePlanName);
router.delete('/delete/:id', planController.deleteplan);
router.get('/allPlans', planController.getAllPlan);

module.exports = router;
