const Inventory = require('../../models/inventoryModel');
const response = require('../../utils/response');
const Product = require('../../models/productModel');
const user = require('../../models/userModel');
const mongoose = require('mongoose')
const find = require('../../query/find');


  const addInventory = async (req, res) => {
      try {
          const inventoryDetails = {
              userId: req.body.userId,
              productId: req.body.productId,
              bookingDate: req.body.bookingDate,
              paymentStatus: req.body.paymentStatus,

          };

          const newInventory = new Inventory(inventoryDetails);
          const savedInventory = await newInventory.save();

          response.sendsuccessData(res, 'Inventory added successfully', savedInventory);
      } catch (error) {
          console.error('Error adding inventory:', error);
          response.sendErrorCustomMessage(res, 'Failed to add inventory', error.message);
      }
  };

const updateInventory = async (req, res) => {
  const { inventoryId } = req.params;
  const updateFields = req.body;

  try {
    const updatedInventory = await Inventory.findByIdAndUpdate(
      inventoryId,
      { $set: updateFields },
      { new: true } // Return the updated document
    );

    if (!updatedInventory) {
      return response.sendErrorMessage(res, 'Inventory not found', 'false');
    }

    response.sendsuccessData(res, 'Inventory updated successfully', updatedInventory);
  } catch (error) {
    console.error('Error updating inventory:', error);
    response.sendErrorCustomMessage(res, 'Failed to update inventory', error.message);
  }
};
const getInventoryDetailById = async (req, res) => {
  try{
  const inventoryId = req.params.id; // Replace 'yourInventoryId' with the actual inventory ID

const inventoryDetails = await Inventory.aggregate([
  {
    $match: {
      _id: mongoose.Types.ObjectId(inventoryId),
    },
  },
  {
    $lookup: {
      from: 'users', // The name of the user collection
      localField: 'userId',
      foreignField: '_id',
      as: 'userDetails',
    },
  },
  {
    $lookup: {
      from: 'products', // The name of the product collection
      localField: 'productId',
      foreignField: '_id',
      as: 'productDetails',
    },
  },
  {
    $project: {
      _id: 1,
      bookingDate: 1,
      paymentStatus: 1,
      userDetails: { $arrayElemAt: ['$userDetails', 0] },
      productDetails: { $arrayElemAt: ['$productDetails', 0] },
    },
  },
]);

// Check if inventoryDetails array has any elements and return the first element
const inventoryDetail = inventoryDetails.length > 0 ? inventoryDetails[0] : null;

// Now, inventoryDetail contains the details of the inventory with the specified ID

  
      res.json({ success: true, data: inventoryDetails });
    } catch (error) {
      console.error('Error retrieving inventory details:', error);
      res.status(500).json({ success: false, message: 'Error retrieving inventory details' });
    }
  };
// const getUserInventoryDetails = async (req, res) => {
//   const userId = req.params.userId;
//   console.log(userId)

//   try {
//     const uniqueProductIds = await Inventory.distinct('productId', { userId });
// console.log(uniqueProductIds)
//     const inventoryDetails = await Promise.all(
//       uniqueProductIds.map(async (productId) => {
//         return Inventory.findOne({ userId, productId })
//           .populate({
//             path: 'productId',
//             model: 'product',
//             select: 'productName price description dailyIncome totalIncome percentage image montly planType',
//           })
//           .exec();
//       })
//     );
// console.log(inventoryDetails)
//     res.json({ success: true, data: inventoryDetails });
//   } catch (error) {
//     console.error('Error retrieving inventory details:', error);
//     res.status(500).json({ success: false, message: 'Error retrieving inventory details' });
//   }
// };
  const deleteInventory = async (req, res) => {
    const { inventoryId } = req.params;
  
    try {
      // Find the inventory item by ID and remove it
      const deletedInventory = await Inventory.findByIdAndRemove(inventoryId);
  
      if (!deletedInventory) {
        return response.sendErrorMessage(res, 'Inventory not found', 'false');
      }
  
      response.sendsuccessData(res, 'Inventory deleted successfully', deletedInventory);
    } catch (error) {
      console.error('Error deleting inventory:', error);
      response.sendErrorCustomMessage(res, 'Failed to delete inventory', error.message);
    }
  };

  // const getAllInventoryDetails = async (req, res) => {
  //   try {
  //     const pageNumber = parseInt(req.params.pageNumber) || 1;
  //     const limit = parseInt(req.params.limit) || 10;
  //     const skip = (pageNumber - 1) * limit;
  
  //     const searchQuery = req.body.search ? {
  //       'userDetails.name': {
  //         $regex: req.body.search,
  //         $options: 'i',
  //       },
  //     } : {};
  
  //     const inventoryDetails = await Inventory.aggregate([
  //       {
  //         $lookup: {
  //           from: 'users', // The name of the user collection
  //           localField: 'userId',
  //           foreignField: '_id',
  //           as: 'userDetails',
  //         },
  //       },
  //       {
  //         $lookup: {
  //           from: 'products', // The name of the product collection
  //           localField: 'productId',
  //           foreignField: '_id',
  //           as: 'productDetails',
  //         },
  //       },
  //       {
  //         $match: searchQuery,
  //       },
  //       {
  //         $facet: {
  //           metadata: [{ $count: 'totalDocs' }, { $addFields: { pageNumber, limit } }],
  //           data: [{ $skip: skip }, { $limit: limit }],
  //         },
  //       },
  //       {
  //         $project: {
  //           data: 1,
  //           totalDocs: { $ifNull: [{ $arrayElemAt: ['$metadata.totalDocs', 0] }, 0] },
  //           pageNumber: '$metadata.pageNumber',
  //           limit: '$metadata.limit',
  //         },
  //       },
  //     ]);
  
  //     response.sendsuccessData(res, 'Inventory data successfully paginated', inventoryDetails);
  //   } catch (error) {
  //     console.error('Error fetching inventory list:', error);
  //     response.sendErrorCustomMessage(res, 'Internal Server Error', 'false');
  //   }
  // };
  
  const getAllInventoryDetails = async (req, res) => {
    try {
      var options = {
          page: parseInt(req.params.pageNumber) || 1,
          limit: parseInt(req.params.limit) || 10,
          sort: { createdAt: -1 },
      }
      var query = {}
      if (req.body.search) {
          query.$and = [{
              $or: [
                  { "name": { $regex: "^" + req.body.search, $options: 'i' } },
                  // { "planType": { $regex: "^" + req.body.search, $options: 'i' } },
              ]
          }]
      }
      // console.log(query,options)
      let result = await Inventory.pagination( query, options);

      response.sendsuccessData(res, "User data succesfully", result)
  } catch (error) {
      console.log('--------------------   product list ---------------- ', error);
      response.sendErrorCustomMessage(res, "Internal Server Error", "false");
  }
  };
  
module.exports = {
    addInventory,
    getInventoryDetailById,
    updateInventory,
    deleteInventory,
    getAllInventoryDetails
};
