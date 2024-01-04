const find = require('../../query/find');
const create = require('../../query/create');
const update = require('../../query/update');
const response = require('../../utils/response');
const bcrypt = require('../../utils/bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const { validationResult } = require('express-validator/check');
var func = require('../../utils/function');
const cloudinary = require('cloudinary');
const notificationFunc = require('../../utils/notification');
const { ObjectId } = require('mongodb');
const mongoose = require("mongoose");

module.exports = {
    addProduct: async (req, res) => {
        try {
            let senderUserDetails = {};
            senderUserDetails.productName = req.body.productName;
            senderUserDetails.price = req.body.price;
            senderUserDetails.dailyIncome = req.body.dailyIncome;
            senderUserDetails.totalIncome = req.body.totalIncome;
            senderUserDetails.percentage = req.body.percentage;
            senderUserDetails.montly = req.body.montly;
            senderUserDetails.planType = req.body.planType;
            senderUserDetails.image = req.body.image;
            let saveDetails = await create.create("productModel", senderUserDetails);
            response.sendsuccessData(res, 'User details retrieved successfully', saveDetails);
        }
        catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     updateProduct : async (req, res) => {
        try {
            const productIdToUpdate = req.params.productId;
            if (!productIdToUpdate) {
                return response.sendErrorMessage(res, 'productId is required for updating', 'false');
            }
            const { _id, ...fieldsToUpdate } = req.body;
            const criteria = { _id: mongoose.Types.ObjectId(productIdToUpdate) };
            const updateDetails = await update.updateMany("productModel", criteria, fieldsToUpdate);
            response.sendsuccessData(res, 'Product updated successfully', updateDetails);
        } catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
    deleteProduct :async (req, res) => {
        try {
            const productIdToDelete = req.params.productId;
            if (!productIdToDelete) {
                return response.sendErrorMessage(res, 'productId is required for deletion', 'false');
            }
            const criteria = { _id: mongoose.Types.ObjectId(productIdToDelete) };
            const deleteResult = await find.findByIdAndRemove("productModel", criteria);
    
            if (deleteResult.deletedCount === 0) {
                return response.sendErrorMessage(res, 'Product not found or already deleted', 'false');
            }
            response.sendsuccessData(res, 'Product deleted successfully', deleteResult);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     getAllProducts : async (req, res) => {
        try {
            const allProducts = await find.findAllPromise('productModel', {}, {}, {});
            const formattedResponse = allProducts.map(product => ({
                productId: product._id,
                productName: product.productName,
                price: product.price,
                dailyIncome:product.dailyIncome,
                totalIncome:product.totalIncome
            }));
    
            response.sendsuccessData(res, 'All products retrieved successfully', formattedResponse);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
        }
    },
}