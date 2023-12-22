const router = require('express').Router();
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const validator = require('../../validator/validation');
const auth = require('../../middleware/auth');
const userController = require('../../controllers/mobile/userController');
const mobileContentController = require('../../controllers/mobile/mobileContentController');
const contentController = require('../../controllers/admin/contentController');
const productController  = require('../../controllers/mobile/productController');
const cardController  = require('../../controllers/mobile/cardController');




router.post('/checkEmail', multipartMiddleware, validator.validate('checkemail'), userController.checkEmail);
router.post('/signup', multipartMiddleware, validator.validate('signup'), userController.signup);
router.get('/user/:_id', multipartMiddleware,  userController.getUserDetails1);
router.get('/users', userController.getUserList);



router.post('/login', multipartMiddleware, validator.validate('login'), userController.Login);
router.post('/forgetpassword', multipartMiddleware, validator.validate('forgetpassword'), userController.ForgotPassword);
router.post('/socialLogin', multipartMiddleware, validator.validate('socialLogin'), userController.socialLogin);
router.post('/loginWithOutCredentials', multipartMiddleware, userController.loginWithOutCredentials);
router.post('/guestLogin', multipartMiddleware, userController.guestLogin);
router.post('/checkSocalId', multipartMiddleware, userController.checkSocalId);
router.get('/getUserDemo', multipartMiddleware, userController.getUserDemo);

router.post('/product/add', multipartMiddleware, productController.addProduct );
router.put('/product/update/:productId', multipartMiddleware, productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);
router.get('/products', productController.getAllProducts);

router.post('/card/add', multipartMiddleware, cardController.addCard);
router.put('/card/update/:cardId', multipartMiddleware, cardController.updateCard);
router.delete('/card/:cardId', cardController.deleteCard);
router.get('/cards', cardController.getAllCard);







// //-------------------------privacyPolicy-----------------------//
// router.post('/editPrivacyPolicy', multipartMiddleware, validator.validate('editPrivacyPolicy'), mobileContentController.editPrivacyPolicy);
// router.get('/listPrivacyPolicy', multipartMiddleware, mobileContentController.listPrivacyPolicy);
// router.post('/addPrivacyPolicy', multipartMiddleware, mobileContentController.addPrivacyPolicy);

// //-------------------------Feedback-----------------------------//
// router.get('/listFeedback', multipartMiddleware, mobileContentController.listFeedback);
// router.post('/addFeedback', multipartMiddleware, validator.validate('addFeedback'), mobileContentController.addFeedback);
// router.post('/deleteFeedback', multipartMiddleware, validator.validate('deleteFeedback'), mobileContentController.deleteFeedback);

// //-------------------------FAQ-----------------------//
// router.post('/editFaq', multipartMiddleware, validator.validate('editFaq'), mobileContentController.editFaq);
// router.get('/listFaq', multipartMiddleware, mobileContentController.listFaq);
// router.post('/addFaq', multipartMiddleware, validator.validate('addFaq'), mobileContentController.addFaq);
// router.post('/deleteFaq', multipartMiddleware, validator.validate('deleteFaq'), mobileContentController.deleteFaq);




















// //-----------------------Check auth--------------------.//
// router.use(auth.authCheck);

// router.get('/listExplanation', multipartMiddleware, mobileContentController.listExplanation);
// router.post('/updateUserProfile', multipartMiddleware, userController.updateUserProfile);
// router.post('/deleteUserAcount', multipartMiddleware, userController.deleteUserAcount);
router.get('/getUserDetails', multipartMiddleware, userController.getUserDetails);



// //-----------------------------notification -----------------------------//
// router.post('/notificationUpdate', multipartMiddleware, notificationController.notificationUpdate);
// router.post('/notificationCount', multipartMiddleware, notificationController.notificationCount);
// router.post('/notificationList', multipartMiddleware, notificationController.notificationList);
// router.get('/notificationListWithToken', multipartMiddleware, notificationController.notificationListbyId);





module.exports = router;



