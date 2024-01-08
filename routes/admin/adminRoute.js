const router = require('express').Router()
const userController = require('../../controllers/admin/userController');
const contentController = require('../../controllers/admin/contentController');
const auth = require('../../middleware/auth');
const multipart = require('connect-multiparty');
const multipartMiddleware = multipart();
const validator = require('../../validator/validation');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Adjust the destination folder as needed
const productController  = require('../../controllers/mobile/productController');
const inventoryController  = require('../../controllers/mobile/inventoryController');


router.post('/createAdmin', multipartMiddleware, userController.createAdmin);
router.post('/adminLogin', multipartMiddleware, validator.validate('login'), userController.adminLogin);
router.get('/adminDetails', multipartMiddleware, auth.adminAuth, userController.adminDetails);
// // //user api
// router.post('/listUser/:limit/:pageNumber', multipartMiddleware, userController.listUser)

router.post('/listUser', multipartMiddleware, userController.listUser)
router.get('/ForgotPassword', userController.adminForgotPassword)
// // router.post('/socialLogin', multipartMiddleware, userController.socialLogin)
// router.post('/login', multipartMiddleware, userController.Login)
// // router.post('/createGame', multipartMiddleware, userController.createGame)
router.post('/changePassword', userController.changePassword);
router.post('/totalCount', multipartMiddleware, userController.totalCount);


router.post('/productList/:limit/:pageNumber', multipartMiddleware, userController.productList)

// // router.use(auth.adminAuth);

router.get('/getUserDetails/:_id/', multipartMiddleware, userController.getUserDetails)
// router.post('/listUser/:limit/:pageNumber', multipartMiddleware, userController.listUser)
// router.post('/editImage/:_id', multipartMiddleware, contentController.editImage);
// router.post('/editGame/:_id', multipartMiddleware, gameController.editGame);
// router.get('/listImage', multipartMiddleware, contentController.listImage);
router.post('/addImage',upload.single('images'),contentController.addImage);
router.post('/editAdminImage/:adminId', contentController.editAdminImage);
// router.post('/deleteImage', multipartMiddleware, validator.validate('deleteFaq'), contentController.deleteImage);
// router.post('/listImage/:limit/:pageNumber', multipartMiddleware, contentController.imagePagination);
// router.get('/listImage/:_id', multipartMiddleware, contentController.getImageById);
// router.post('/gameCreate', multipartMiddleware, gameController.gameCreate);
// router.get('/gameDetailsById/:_id', multipartMiddleware, gameController.gameDetailsById);
// router.post('/listGame/:limit/:pageNumber', multipartMiddleware, gameController.listGamePagination);
// router.post('/AllUserNotification', multipartMiddleware, contentController.AllUserNotification);
// router.post('/totalUser', multipartMiddleware, contentController.totalUser);
router.post('/updateUserProfileStatus', multipartMiddleware, userController.updateUserProfileStatus);
// router.post('/PageLoadTotalUser', multipartMiddleware, contentController.PageLoadTotalUser);
// router.post('/helpandsuport', multipartMiddleware, contentController.helpandsuport);
// router.get('/helpAndSuportValue/:type', multipartMiddleware, contentController.helpAndSuportValue);
// router.post('/helpAndSuportUpdate', multipartMiddleware, contentController.helpAndSuportUpdate);

router.post('/product/add', multipartMiddleware, productController.addProduct );
router.put('/product/update/:productId', multipartMiddleware, productController.updateProduct);
router.delete('/product/:productId', productController.deleteProduct);
router.get('/product/:productId', multipartMiddleware, productController.getProductById);

// router.get('/products', productController.getAllProducts);

router.post('/inventory/add', multipartMiddleware, inventoryController.addInventory );
router.get('/user/:userId/inventory', multipartMiddleware, inventoryController.getUserInventoryDetails );
router.put('/inventory/:inventoryId', multipartMiddleware,inventoryController.updateInventory);
router.delete('/inventory/:inventoryId', multipartMiddleware,inventoryController.deleteInventory);


module.exports = router;
