const Inventory = require('../../models/inventoryModel');
const response = require('../../utils/response');
const Product = require('../../models/productModel');

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
// const getUserInventoryDetails = async (req, res) => {
//     const userId = req.params.userId; // Assuming userId is part of the request params
  
//     try {
//       const inventoryDetails = await Inventory.find({ userId })
//         .populate({
//           path: 'productId',
//           model: 'product', // Reference the Product model
//           select: 'productName price description dailyIncome totalIncome percentage image montly planType', // Choose the fields you want to include
//         })
//         .exec();
  
//       res.json({ success: true, data: inventoryDetails });
//     } catch (error) {
//       console.error('Error retrieving inventory details:', error);
//       res.status(500).json({ success: false, message: 'Error retrieving inventory details' });
//     }
//   };
const getUserInventoryDetails = async (req, res) => {
  const userId = req.params.userId;

  try {
    const uniqueProductIds = await Inventory.distinct('productId', { userId });

    const inventoryDetails = await Promise.all(
      uniqueProductIds.map(async (productId) => {
        return Inventory.findOne({ userId, productId })
          .populate({
            path: 'productId',
            model: 'product',
            select: 'productName price description dailyIncome totalIncome percentage image montly planType',
          })
          .exec();
      })
    );

    res.json({ success: true, data: inventoryDetails });
  } catch (error) {
    console.error('Error retrieving inventory details:', error);
    res.status(500).json({ success: false, message: 'Error retrieving inventory details' });
  }
};
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
module.exports = {
    addInventory,
    getUserInventoryDetails,
    updateInventory,
    deleteInventory
};
