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
const Category = require('../../models/categoryModel');

module.exports = {
    addProduct: async (req, res) => {
//         Id=req.body._id
//         const catId = { _id: mongoose.Types.ObjectId(Id) };
//         const category = await Category.findById(catId );
// console.log(category,"category")
//         if (!category) {
//             return response.sendErrorMessage(res, 'Category not found', 'false');
//         }
        try {
            const productDetails = {
                productName: req.body.productName,
                description: req.body.description,
                price: req.body.price,
                dailyIncome: req.body.dailyIncome,
                totalIncome: req.body.totalIncome,
                percentage: req.body.percentage,
                totalDays: req.body.monthly *30,
                monthly: req.body.monthly,

                planType: req.body.planType,
                // planType: category._id, // Use the category ID
                risk: req.body.risk,
                image: req.body.image,
            };
console.log(productDetails)
            const savedProduct = await create.create("productModel", productDetails);

            response.sendsuccessData(res, 'Product added successfully', savedProduct);
        } catch (error) {
            console.error('Error adding product:', error);
            response.sendErrorCustomMessage(res, 'Failed to add product', error.message);
        }
    },
    updateProduct: async (req, res) => {
        try {
            const productIdToUpdate = req.params.productId;

            if (!productIdToUpdate) {
                return response.sendErrorMessage(res, 'productId is required for updating', 'false');
            }

            const { _id, ...fieldsToUpdate } = req.body;
            const criteria = { _id: productIdToUpdate };

            const updateDetails = await update.updateMany("productModel", criteria, fieldsToUpdate);

            response.sendsuccessData(res, 'Product updated successfully', updateDetails);
        } catch (error) {
            console.error('Error updating product:', error);
            response.sendErrorCustomMessage(res, 'Failed to update product', error.message);
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
            console.error('Error deleting product:', error);
            response.sendErrorCustomMessage(res, 'Failed to delete product', error.message);
        }
    },
    //  getAllProducts : async (req, res) => {
    //     try {
    //         const allProducts = await find.findAllPromise('productModel', {}, {}, {});
    //         response.sendsuccessData(res, 'All products retrieved successfully', allProducts);
    //     } catch (error) {
    //         console.log(error);
    //         response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
    //     }
    // },
    getProductById: async (req, res) => {
        try {
            const productId = req.params.productId;

            if (!mongoose.Types.ObjectId.isValid(productId)) {
                return response.sendErrorMessage(res, 'Invalid productId format', 'false');
            }

            const productDetails = await find.findByIdPromise('productModel', productId);

            if (!productDetails) {
                return response.sendErrorMessage(res, 'Product not found', 'false');
            }

            response.sendsuccessData(res, 'Product details retrieved successfully', productDetails);
        } catch (error) {
            console.error('Error retrieving product details by ID:', error);
            response.sendErrorCustomMessage(res, 'Failed to retrieve product details', error.message);
        }
    },
}