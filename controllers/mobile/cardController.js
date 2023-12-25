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
    addCard: async (req, res) => {
        try {
            let senderCardDetails = {};
            senderCardDetails.bankAcount = req.body.bankAcount;
            senderCardDetails.accountHolder = req.body.accountHolder;
            senderCardDetails.ifsc = req.body.ifsc;
           
            let saveCardDetails = await create.create("cardModel", senderCardDetails);
            response.sendsuccessData(res, 'User details retrieved successfully', saveCardDetails);
        }
        catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     updateCard : async (req, res) => {
        try {
            const cardIdToUpdate = req.params.cardId;
            if (!cardIdToUpdate) {
                return response.sendErrorMessage(res, 'cardId is required for updating', 'false');
            }
            const { _id, ...fieldsToUpdate } = req.body;
            const criteria = { _id: mongoose.Types.ObjectId(cardIdToUpdate) };
            const updateDetails = await update.updateMany("cardModel", criteria, fieldsToUpdate);
            response.sendsuccessData(res, 'Card updated successfully', updateDetails);
        } catch (error) {
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
    deleteCard :async (req, res) => {
        try {
            const cardIdToDelete = req.params.cardId;
            if (!cardIdToDelete) {
                return response.sendErrorMessage(res, 'cardId is required for deletion', 'false');
            }
            const criteria = { _id: mongoose.Types.ObjectId(cardIdToDelete) };
            const deleteResult = await find.findByIdAndRemove("cardModel", criteria);
    
            if (deleteResult.deletedCount === 0) {
                return response.sendErrorMessage(res, 'Card not found or already deleted', 'false');
            }
            response.sendsuccessData(res, 'Card deleted successfully', deleteResult);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(error, 'Internal Server Error', 'false');
        }
    },
     getAllCard : async (req, res) => {
        try {
            const allCard = await find.findAllPromise('cardModel', {}, {}, {});
            const formattedResponse = allCard.map(card => ({
                cardId: card._id,
                bankAcount: card.bankAcount,
                accountHolder: card.accountHolder,
                ifsc:card.ifsc,
            }));
    
            response.sendsuccessData(res, 'All Cards retrieved successfully', formattedResponse);
        } catch (error) {
            console.log(error);
            response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
        }
    },
}