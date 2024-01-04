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
// const Product = require('../../models/productModel');

module.exports = {
    addPlanName: async (req, res) => {
        try {
            let planNameDetails = {};
            planNameDetails.planName = req.body.planName;
          
           
            let savePlanDetails = await create.create("planModel", planNameDetails);
            response.sendsuccessData(res, 'Add plan successfully', savePlanDetails);
        }
        catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     updatePlanName : async (req, res) => {
        try {
            const planIdToUpdate = req.params.id;
            if (!planIdToUpdate) {
                return response.sendErrorMessage(res, 'planId is required for updating', 'false');
            }
            const { _id, ...fieldsToUpdate } = req.body;
            const criteria = { _id: mongoose.Types.ObjectId(planIdToUpdate) };
            const updateDetails = await update.updateMany("planModel", criteria, fieldsToUpdate);
            response.sendsuccessData(res, 'plan updated successfully', updateDetails);
        } catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
    deleteplan :async (req, res) => {
        try {
            const planIdToDelete = req.params.id;
            if (!planIdToDelete) {
                return response.sendErrorMessage(res, 'planId is required for deletion', 'false');
            }
            const criteria = { _id: mongoose.Types.ObjectId(planIdToDelete) };
            const deleteResult = await find.findByIdAndRemove("planModel", criteria);
    
            if (deleteResult.deletedCount === 0) {
                return response.sendErrorMessage(res, 'plan not found or already deleted', 'false');
            }
            response.sendsuccessData(res, 'plan deleted successfully', deleteResult);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     getAllPlan : async (req, res) => {
        try {
            const allplan = await find.findAllPromise('planModel', {}, {}, {});
            const formattedResponse = allplan.map(plan => ({
                planId: plan._id,
                planName: plan.planName,
              
            }));
    
            response.sendsuccessData(res, 'All plans retrieved successfully', formattedResponse);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
        }
    },
}