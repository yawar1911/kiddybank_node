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



const addCategory = async (req, res) => {
    try {
        const { categoryName } = req.body;

        const newCategory = new Category({ categoryName });
        const savedCategory = await newCategory.save();

        response.sendsuccessData(res, 'Category added successfully', savedCategory);
    } catch (error) {
        console.error('Error adding subcategory:', error);
        response.sendErrorCustomMessage(res, 'Failed to add Category', error.message);
    }
};

const updateCategory = async (req, res) => {
    try {
        const { categoryId } = req.params;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
            return response.sendErrorMessage(res, 'Invalid category ID', 'false', 400);
        }

        const updateFields = req.body;
        // console.log(updateFields);

        const updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { $set: updateFields },
            { new: true }
        );

        if (!updatedCategory) {
            return response.sendErrorMessage(res, 'category not found', 'false');
        }

        response.sendsuccessData(res, 'category updated successfully', updatedCategory);
    } catch (error) {
        console.error('Error updating category:', error);
        response.sendErrorCustomMessage(res, 'Failed to update category', error.message);
    }
};


const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;

    try {
        const deletedCategory = await Category.findByIdAndRemove(categoryId);

        if (!deletedCategory) {
            return response.sendErrorMessage(res, 'category not found', 'false');
        }

        response.sendsuccessData(res, 'category deleted successfully', deletedCategory);
    } catch (error) {
        console.error('Error deleting category:', error);
        response.sendErrorCustomMessage(res, 'Failed to delete category', error.message);
    }
};

const getCategoryDetails = async (req, res) => {
    const {categoryId } = req.params;

    try {
        const CategoryDetails = await Category.findById(categoryId);

        if (!CategoryDetails) {
            return response.sendErrorMessage(res, 'category not found', 'false');
        }

        response.sendsuccessData(res, 'category details retrieved successfully', CategoryDetails);
    } catch (error) {
        console.error('Error retrieving category details:', error);
        response.sendErrorCustomMessage(res, 'Failed to retrieve category details', error.message);
    }
};

module.exports = {
    addCategory,
    updateCategory,
    deleteCategory,
    getCategoryDetails,
};
