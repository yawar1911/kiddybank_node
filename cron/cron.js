const mongoose = require("mongoose")
const Inventory = require("../models/inventoryModel")
const Product = require("../models/productModel")
const find = require('../query/find');

// const {getAllInventoryDetails} =require("../controllers/mobile/inventoryController")
async function startProcess() {
  console.log('function is calling..........')

}
async function getUserInventoryDetails() {

  console.log('function inventory is calling..........')

  try {

    let inventoryDetails = await Inventory.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "userDetails"
        }
      },
      {
        $lookup: {
          from: "products",
          localField: "productId",
          foreignField: "_id",
          as: "productDetails"
        }
      },
      {
        $unwind: {
          path: "$userDetails",
          preserveNullAndEmptyArrays: true
        }
      },
      {
        $unwind: {
          path: "$productDetails",
          preserveNullAndEmptyArrays: true
        }
      }
    ])

    for (let i = 0; i <= inventoryDetails.length-1; i++) {
      const { percentage, totalDays, risk,price } = inventoryDetails[i].productDetails;
      const Amount = (price * percentage / 100) / totalDays;
      const riskAmount = (inventoryDetails[i].planBuy.amount + Amount).toFixed(1);

      await Inventory.findByIdAndUpdate(inventoryDetails[i]._id,  { $set: { 'planBuy.amount': parseFloat(riskAmount) }}); // parse convert in number
    }
    
  } catch (error) {
    console.error('Error retrieving inventory details:', error);
  }
};


const cron = require('node-cron');

function start() {
  console.log("Starting cron job...");

  cron.schedule('*/10000 * * * * * ', async () => {
    await getUserInventoryDetails();
  });
}


module.exports = {
  start
};

