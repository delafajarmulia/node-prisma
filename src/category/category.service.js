const { findCategories, findCategoryById, findCategoryByName, insertCategory } = require("./category.repository")

const getAllCategories = async() => {
    const categories = await findCategories()
    return categories
}

const getCategoryById = async (id) => {
    const category = await findCategoryById(id)

    if(!category){
        throw Error("product not found")
    }
    return category
}

const createCategory = async (newDataCategory) => {
    const findCategory = await findCategoryByName(newDataCategory.name)
    if(findCategory){
        throw Error("name has to be unique")
    }

    const newCategory = await insertCategory(newDataCategory)
    return newCategory
}

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory
}