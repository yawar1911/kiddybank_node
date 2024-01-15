const find = require('../../query/find');
const create = require('../../query/create');
const response = require('../../utils/response');
const bcrypt = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../../config/config');
const { validationResult } = require('express-validator/check');
var func = require('../../utils/function');
const cloudinary = require('cloudinary');
const mongoose = require("mongoose");
var ObjectId = require('mongodb').ObjectId;

cloudinary.config({
    cloud_name: "dwvnagtp4",
    api_key: "913296893489775",
    api_secret: "fR35nm9gdB6UTYape3kTTN3UeyQ"
});

module.exports = {
    //---------------signup-----------------//
    signup: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.sendErrorMessage(res, errors.array()[0].msg, "false");
            }
    
            const emailExist = await find.findOnePromise("userModel", { email: req.body.email }, {}, {});
            if (emailExist) {
                return response.sendErrorMessage(res, "Email already exists");
            }
    
            const hashedPassword = await bcrypt.bcryptGenerate(req.body.password);
    
            const userData = {
                name:req.body.name,
                email: req.body.email,
                password: hashedPassword,
                mobile:req.body.mobile,

                
            };
    
            const result = await create.create("userModel", userData);
    
            const userCriteria = { _id: result._id };
            const jwtToken = jwt.sign({ _id: result._id }, config.jwtSecretKey, { expiresIn: '5d' });
            
            await find.findAndUpdatePromise("userModel", userCriteria, { jwtToken }, {});
    
            const updatedUserData = await find.findOnePromise("userModel", userCriteria, {}, {});
    
            response.sendsuccessData(res, "User signed up successfully", updatedUserData);
        } catch (error) {
            console.error(error);
            response.sendErrorCustomMessage(res, "Internal Server Error", "false");
        }
    },
     getUserDetails1 :async (req, res) => {
        try {
            console.log(req.user.Id)
            const userId = req.user._id; // Assuming userId is a parameter in the route
            
            // Validate if userId is a valid ObjectId (MongoDB ObjectId)
            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return response.sendErrorMessage(res, 'Invalid user ID', 'false');
            }
    
            const userCriteria = { _id: userId };
            const userDetails = await find.findOnePromise('userModel', userCriteria, {}, {});
    
            if (!userDetails) {
                return response.sendErrorMessage(res, 'User not found', 'false');
            }
    
            // You can customize the response format as needed
            const formattedResponse = {
                userId: userDetails._id,
                name: userDetails.name,
                email: userDetails.email,
                mobile: userDetails.mobile,
                amount: userDetails.amount,
                profilePic: userDetails.profilePic,
                createdAt: userDetails.createdAt,
                updatedAt: userDetails.updatedAt
                // Add other fields as needed
            };
    
            response.sendsuccessData(res, 'User details retrieved successfully', formattedResponse);
        } catch (error) {
            console.log(error)
            response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
        }
    },
     getUserList : async (req, res) => {
        try {
            // Fetch users based on your criteria (here, an empty criteria retrieves all users)
            const userList = await find.findAllPromise('userModel', {}, {}, {});
    
            // You can customize the response format as needed
            const formattedUserList = userList.map(user => ({
                userId: user._id,
                name: user.name,
                email: user.email,
                mobile: user.mobile,
                amount: user.amount,
                createdAt: user.createdAt,
                updatedAt: user.updatedAt
            }));
    
            // Send the formatted user list as a successful response
            response.sendsuccessData(res, 'User list retrieved successfully', formattedUserList);
        } catch (error) {
            // Handle errors and send an appropriate error response
            console.error('Error in getUserList:', error);
            response.sendErrorCustomMessage(res, 'Internal Server Error', 'false', 500);
        }
    },
    //-------------------checkEmail---------//
    checkEmail: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
        }
        try {
            let criteria = {}
            var email = req.body.email;
            var username = req.body.username;
            criteria = { username: username };
            let admin = await find.findOnePromise("userModel", criteria, {}, {})
            console.log(admin)
            if (admin) {
                return response.sendErrorMessage(res, "username already exits")
            }
            criteria1 = { email: email };
            let admin1 = await find.findOnePromise("userModel", criteria1, {}, {})
            if (admin1) {
                return response.sendErrorMessage(res, "Email already exits")
            }
            response.sendSuccessMessage(res, "User not exits");
        } catch (error) {
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //---------------Login-----------------//
    Login: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
            }
            var mobile = req.body.mobile;
            criteria = {  mobile: mobile };
            let admin = await find.findOnePromise("userModel", criteria, {}, {})

            if (!admin) {
                return response.sendErrorMessage(res, "Invalid credentials")
            }
            let comparePassword = await bcrypt.bcryptCompare(req.body.password, admin.password);
            if (!comparePassword) {
                return response.sendErrorMessage(res, "Invalid password")
            }
            const options = {
                expiresIn: '60d'
            }
            let jwtToken = await jwt.sign({
                _id: admin._id,
            }, config.jwtSecretKey, options);
            let dataToUpdate = {}
            dataToUpdate.jwtToken = jwtToken;
            dataToUpdate.deviceType = req.body.deviceType;
            dataToUpdate.deviceToken = req.body.deviceToken;
            let result = await find.findAndUpdatePromise("userModel", criteria, dataToUpdate, {})
            let user2 = await find.findOnePromise("userModel", criteria, {}, {})
            return response.sendsuccessData(res, "Login succesfully", user2);
        } catch (error) {
            console.log('--------------------   adminLogin ---------------- ', error);
            response.sendErrorCustomMessage(res, "Internal Server Error", "false");
        }
    },
    //--------------ForgotPassword--------//
    ForgotPassword: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
            }
            console.log(req.body.email)
            req.body.email = req.body.email
            let criteria = {}
            criteria.email = req.body.email;
            let checkEmail = await find.findOnePromise("userModel", criteria, {}, {});
            if (!checkEmail) {
                return response.sendErrorMessage(res, "Invalid Email")
            }
            let adminId = checkEmail._id;
            let otp = Math.floor(10000000 + Math.random() * 90000000)
            let name = checkEmail.name;
            let criteria1 = {}
            criteria1._id = adminId;
            let dataToSave = {};
            dataToSave.otp = otp;
            dataToSave.email = req.body.email;
            let result = await create.create("userotpModel", dataToSave);
            let link = `http://localhost:4200/#/email-verification/${otp}/${adminId}`;
            response.sendSuccessMessage(res, "New password has been sent on your registered email");
            func.sendHtmlEmail1(req.body.email, "Forgot Password", name, link, (error1, result1) => {
            })
        } catch (error) {
            console.log(error)
            response.sendErrorCustomMessage(res, "Internal Server Error", "false");
        }
    },

    socialLogin: async (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
            }
            if (!req.body.socialId || !req.body.socialType) {
                return response.sendErrorMessage(res, "Something went wrong", "false");
            }
            let criteria = { $and: [{ "socialId": req.body.socialId }, { "socialType": req.body.socialType }] }
            var checkUser = await find.findOnePromise("userModel", criteria, {}, {});
            if (!checkUser) {
                if (req.body.email) {
                    req.body.email = req.body.email.toLowerCase();
                    let criteria1 = { "email": req.body.email }
                    let checkEmail = await find.findOnePromise("userModel", criteria1, {}, {});
                    if (!checkEmail) {
                        let socialLoginObj = {}
                        socialLoginObj.languageCode = req.body.languageCode;
                        socialLoginObj.type = req.body.type
                        socialLoginObj.socialId = req.body.socialId;
                        socialLoginObj.socialType = req.body.socialType;
                        socialLoginObj.deviceToken = req.body.deviceToken;
                        socialLoginObj.deviceType = req.body.deviceType;
                        socialLoginObj.jwtToken = "";
                        socialLoginObj.name = req.body.name;
                        socialLoginObj.profilePic = req.body.profilePic;
                        socialLoginObj.email = req.body.email;
                        socialLoginObj.mobileNumber = req.body.mobileNumber;
                        let result = await create.create("userModel", socialLoginObj);
                        let jwtToken = jwt.sign({ "socialType": req.body.socialType, _id: result._id, socialId: req.body.socialId }, config.jwtSecretKey);
                        let criteria1 = {};
                        criteria1._id = result._id;
                        var test = await find.findByIdAndUpdatePromise("userModel", criteria1, { $set: { jwtToken: jwtToken } }, { new: true }, {})
                        return response.sendsuccessData(res, "You have successfully logged in", test);
                    }
                    if (checkEmail.socialId && checkEmail.socialType) {
                        let criteria2 = { _id: checkEmail._id }
                        let jwtToken = jwt.sign({ "socialType": req.body.socialType, _id: checkEmail._id, socialId: req.body.socialId }, config.jwtSecretKey);
                        let project = { $set: { jwtToken: jwtToken, socialId: req.body.socialId, socialType: req.body.socialType, name: req.body.name, profilePic: req.body.profilePic, deviceToken: req.body.deviceToken, deviceType: req.body.deviceType, languageCode: req.body.languageCode, type: req.body.type } };
                        let opation = { new: true }
                        let result = await find.findByIdAndUpdatePromise("userModel", criteria2, project, opation);
                        response.sendsuccessData(res, "You have successfully logged in", result);
                    }
                }
                let socialLoginObj = {}
                socialLoginObj.socialId = req.body.socialId,
                    socialLoginObj.languageCode = req.body.languageCode,
                    socialLoginObj.socialType = req.body.socialType,
                    socialLoginObj.deviceToken = req.body.deviceToken,
                    socialLoginObj.deviceType = req.body.deviceType,
                    socialLoginObj.jwtToken = "",
                    socialLoginObj.name = req.body.name,
                    socialLoginObj.email = req.body.email,
                    socialLoginObj.profilePic = req.body.profilePic,
                    socialLoginObj.type = 1,
                    socialLoginObj.mobileNumber = req.body.mobileNumber
                let result = await create.create("userModel", socialLoginObj);
                let jwtToken = jwt.sign({ "socialType": req.body.socialType, _id: result._id, "socialId": req.body.socialId }, config.jwtSecretKey);
                let criteria6 = {};
                criteria6._id = result._id;
                var test = await find.findByIdAndUpdatePromise("userModel", criteria6, { $set: { jwtToken: jwtToken } }, { new: true }, {})
                response.sendsuccessData(res, "You have successfully logged in", test);
            }
            // else if (checkUser.status == 'Inactive') {
            //     response.sendErrorMessage(res, "Email already exist", "false");
            //     res.send({ status: "FAILURE", response_message: ("Your account have been disabled by administrator due to any suspicious activity") });
            // }

            let criteria2 = { _id: checkUser._id }
            let jwtToken = jwt.sign({ "socialType": req.body.socialType, _id: checkUser._id, "socialId": req.body.socialId }, config.jwtSecretKey);
            let project = { $set: { jwtToken: jwtToken, languageCode: req.body.languageCode } }
            let opation = { new: true }
            let result = await find.findByIdAndUpdatePromise("userModel", criteria2, project, opation);
            return response.sendsuccessData(res, "You have successfully logged in", result);
        } catch (error) {
            console.log(error)
            response.sendErrorCustomMessage(res, "Internal Server Error", "false");
        }
    },
    notificationUpdate: async (req, res) => {
        try {
            let criteria = {
                _id: req.user._id
            }
            let dataToUpdate = req.body;
            find.findAndUpdatePromise("userModel", criteria, dataToUpdate, { new: true })
            response.sendsuccessData(res, ("notification Setting updated"))
        } catch (error) {
            console.log('--------------------   notificationSetting ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //---------------logout---------------//
    logout: async (req, res) => {
        try {
            let criteria = {
                _id: req.user._id
            }
            find.findOneAndDeletePromise("userModel", criteria, { $set: { jwtToken: '', deviceType: '', deviceToken: '' } }, { new: true }, {})
            response.sendSuccessMessage(res, ("Logout successfully"))
        } catch (error) {
            console.log('--------------------   logout ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //---------------loginWithDevices---------//
    loginWithOutCredentials: async (req, res) => {
        try {
            if (req.body.deviceToken && req.body.deviceType) {
                let criteria = { $and: [{ "deviceToken": req.body.deviceToken }, { "deviceType": req.body.deviceType }] }
                var checkUser = await find.findOnePromise("userModel", criteria, {}, {});
                let dataToSave = {};
                if (!checkUser) {
                    dataToSave = req.body;
                    let result = await create.create("userModel", dataToSave);
                    let jwtToken = jwt.sign({ "deviceToken": req.body.deviceToken, "deviceType": req.body.deviceType, _id: result._id }, config.jwtSecretKey);
                    let criteria1 = {};
                    criteria1._id = result._id;
                    var test = await find.findByIdAndUpdatePromise("userModel", criteria1, { $set: { jwtToken: jwtToken } }, { new: true }, {})
                    return response.sendsuccessData(res, "You have successfully logged in", test);
                } else {
                    let criteria2 = { _id: checkUser._id }
                    let project = { $set: { deviceToken: req.body.deviceToken, deviceType: req.body.deviceType } };
                    let opation = { new: true }
                    let result = await find.findByIdAndUpdatePromise("userModel", criteria2, project, opation);
                    return response.sendsuccessData(res, "You have successfully logged in", result);
                }
            }
        } catch (error) {
            response.sendErrorCustomMessage(res, "Internal Server Error", "false");
        }
    },
    //---------------getUserDetails---------// 
    getUserDetails: async (req, res) => {
        try {
            console.log(req.user)
            let criteria = {
                _id: req.user._id
            }
            let option = { lean: true }
            let result = await find.findOnePromise("userModel", criteria, {}, option);
            let result1 = await find.findAllPromise("languageModel", {}, {}, {})

            let created = await Room.aggregate([
                {
                    $match: {
                        $or: [{
                            $and: [{
                                "sender_id": ObjectId(req.user._id)
                            }]
                        }],
                    },
                },
                {
                    $group:
                    {
                        _id: 1,
                        count: { $sum: 1 },
                    },
                },

            ])
            let wordCount = await gameOver.aggregate([
                {
                    $match: {
                        $or: [{
                            $and: [{
                                "sender_id": ObjectId(req.user._id)
                            }]
                        },
                        {
                            $and: [{
                                "receiver_id": ObjectId(req.user._id)
                            }]
                        }],
                    },
                },
                {
                    $group:
                    {
                        _id: 1,
                        WordCounts: { $sum: "$WordCount" },

                    },
                },
            ])
            let mode = await Room.aggregate([
                {
                    $match: {
                        $or: [{
                            $and: [{
                                "sender_id": ObjectId(req.user._id)
                            },

                            ]
                        },
                        {
                            $and: [{
                                "receiver_id": ObjectId(req.user._id)
                            },
                            ]
                        }],

                    },
                },
                {
                    $group: {
                        _id: { name: "$type" },
                        count: { $sum: 1 }

                    }
                }
            ])
            let played = await Room.aggregate([
                {
                    $match: {
                        $or: [{
                            $and: [{
                                "sender_id": ObjectId(req.user._id)
                            }]
                        },
                        {
                            $and: [{
                                "receiver_id": ObjectId(req.user._id)
                            }]
                        }],
                    },
                },
                {
                    $group:
                    {
                        _id: 1,
                        count: { $sum: 1 },
                    },
                },
            ])
          var  patners = 2;
           var accuracy = 43;
          var rank = 3;
            var create = 0;
            if (created.length > 0) {
                create = created[0].count
            }
            var playe = 0;
            if (played.length > 0) {
                playe = played[0].count
            }
            var wordCountAlls = 0;
            if (wordCount.length > 0) {
                wordCountAlls = wordCount[0].WordCounts
            }
            var Modes = 0
            if (mode.length === 0) {
                Modes = 0;
            } else if (mode.length === 1) {
                Modes = mode[0]._id.name
            } else if (mode.length === 2) {
                if (mode[0].count > mode[1].count) {
                    Modes = mode[0]._id.name
                } else {
                    Modes = mode[1]._id.name
                }
            }
            if (!result) {
                return response.sendErrorMessage(res, ("User does not exist"))
            }
            if (!result1) {
                return response.sendErrorMessage(res, ("User does not exist"))
            }
            response.sendsuccessDataMultiple(res, ("User details found"), result, result1, create, wordCountAlls, Modes, playe, patners, rank, accuracy)
        } catch (error) {
            console.log('--------------------   getuserDetails ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },

    //---------------deleteUserAcount---------// 
    deleteUserAcount: async (req, res) => {
        try {
            console.log(req.user._id)
            let criteria = {
                _id: req.user._id
            }
            find.findAndRemovePromise("userModel", criteria, {})
            response.sendsuccessData(res, ('User profile deleted successfully'));
        } catch (error) {
            console.log('--------------------   deleteServiceProfile ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //------------------------updateUserProfile---------// 
    updateUserProfile: async (req, res) => {
        try {
            // console.log(req.user._id)
            const userId = req.user._id;

            if (!mongoose.Types.ObjectId.isValid(userId)) {
                return response.sendErrorCustomMessage(res, 'Invalid user ID', 'false');
            }
    // const updateId = {_id:mongoose.Types.ObjectId(userId)};
            let criteria = {};
    
           
            if (req.body.name) {
                criteria.name = req.body.name;
            }
    
            if (req.body.email) {
                criteria.email = req.body.email;
            }
    
            if (req.body.mobile) {
                criteria.mobile = req.body.mobile;
            }
            // if (req.body.amount) {
            //     criteria.amount = req.body.amount;
            // }
            if (req.body.profilePic) {
                criteria.profilePic = req.body.profilePic;
    

            }
            let result = await find.findByIdAndUpdatePromise("userModel", userId, criteria, { new: true }, {});
            response.sendsuccessData(res, 'User profile updated', result);
        } catch (error) {
            console.log('--------------------   updateProfile ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //------------------guest login-------------//
    guestLogin: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
        }
        try {
            let dataToSave = req.body;
            let result = await create.create("userModel", dataToSave);
            let userCriteria = {
                _id: result._id
            }
            let dataToUpdate = {};
            dataToUpdate.jwtToken = jwt.sign({ _id: result._id }, config.jwtSecretKey, { expiresIn: '90d' })
            let result1 = await find.findAndUpdatePromise("userModel", userCriteria, dataToUpdate, {})
            let result3 = await find.findOnePromise("userModel", userCriteria, {}, {})
            response.sendsuccessData(res, ("User signed up sucessfully"), result3);
        } catch (error) {
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //------------------check login-------------//
    checkSocalId: async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return response.sendErrorMessage(res, errors.array().slice(0, 1).map(function (errs) { return errs.msg; }).toString(), "false");
        }
        try {
            let criteria = {
                socialId: req.body.socialId
            }
            console.log(criteria)
            let option = { lean: true }
            let result = await find.findOnePromise("userModel", criteria, {}, { option });
            if (!result) {
                return response.sendSuccessMessage(res, ("User does not exist"))
            }
            let result1 = await find.findAllPromise("languageModel", {}, {}, {})
            if (!result1) {
                return response.sendErrorMessage(res, ("User does not exist"))
            }
            response.sendsuccessDataMultiple(res, ("User details found"), result, result1)
        } catch (error) {
            console.log(error)
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    },
    //-------------------getUserDemo--------------------------//
    getUserDemo: async (req, res) => {

        try {
            let criteria = {
                "socialType": "Facebook"
            }
            let option = { lean: true }
            let result = await find.findAllPromise("userModel", criteria, {}, option);

            response.sendsuccessData(res, ("User details found"), result)
        } catch (error) {
            console.log('--------------------   getuserDetails ---------------- ', error);
            response.sendErrorCustomMessage(res, ("Internal Server Error"), "false");
        }
    }
}
async function imageUpload(imageFile) {
    return new Promise((resolve, reject) => {
        cloudinary.v2.uploader.upload(imageFile.path, (error, result) => {
            if (error) {
                console.log(error)
                reject(error);
            } else {
                resolve(result);
            }
        })
    })
}



