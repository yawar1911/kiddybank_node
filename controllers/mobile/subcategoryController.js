const Category = require('../../models/categoryModel');
const response = require('../../utils/response');
const subcategory = require('../../models/subCategoryModel');

  const addSubcategory = async (req, res) => {
      try {
          const subCategoryDetails = {
              subcategoryName: req.body.subcategoryName,
              categoryId: req.body.categoryId,
          };

          const newSubCategory = new subcategory(subCategoryDetails);
          const savedSubCategory = await newSubCategory.save();

          response.sendsuccessData(res, 'subCategory added successfully', savedSubCategory);
      } catch (error) {
          console.error('Error adding subCategory:', error);
          response.sendErrorCustomMessage(res, 'Failed to add subCategory', error.message);
      }
  };

  const updateSubCategory = async (req, res) => {
    const { subcategoryId } = req.params;
    const updateFields = req.body;
  
    try {
      
      const updatedSubCategory = await subcategory.findByIdAndUpdate(
        subcategoryId,
        { $set: updateFields },
        { new: true } 
      );
  
      if (!updatedSubCategory) {
        return response.sendErrorMessage(res, 'Subcategory not found', 'false');
      }
  
      response.sendsuccessData(res, 'Subcategory updated successfully', updatedSubCategory);
    } catch (error) {
      console.error('Error updating subCategory:', error);
      response.sendErrorCustomMessage(res, 'Failed to update subCategory', error.message);
    }
  };
  
const getAllSubCategories = async (req, res) => {
    try {
        const subcategories = await subcategory.find().populate('categoryId');
        response.sendsuccessData(res, 'subcategories retrieved successfully', subcategories);
    } catch (error) {
        console.error('Error retrieving subcategories:', error);
        response.sendErrorCustomMessage(res, 'Failed to retrieve subcategories', error.message);
    }
};

const getSubCategoryById = async (req, res) => {
    const { subcategoryId } = req.params;
    
    try {
        const Subcategory = await subcategory.findById(subcategoryId).populate('categoryId');
        
        if (!Subcategory) {
            return response.sendErrorMessage(res, 'subCategory not found', 'false');
        }

        response.sendsuccessData(res, 'subCategory retrieved successfully', Subcategory);
    } catch (error) {
        console.error('Error retrieving subcategory:', error);
        response.sendErrorCustomMessage(res, 'Failed to retrieve subcategory', error.message);
    }
};

  const deleteSubCategory = async (req, res) => {
    const { subcategoryId } = req.params;
  
    try {
      const deletedSubCategory = await subcategory.findByIdAndRemove(subcategoryId);
  
      if (!deletedSubCategory) {
        return response.sendErrorMessage(res, 'SubCategory not found', 'false');
      }
  
      response.sendsuccessData(res, 'SubCategory deleted successfully', deletedSubCategory);
    } catch (error) {
      console.error('Error deleting SubCategory:', error);
      response.sendErrorCustomMessage(res, 'Failed to delete SubCategory', error.message);
    }
  };
module.exports = {
  addSubcategory,
  updateSubCategory,
    deleteSubCategory,
    getSubCategoryById,
    getAllSubCategories
  
};
