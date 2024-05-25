// service tujuannya untuk heandle bussiness logic 
// spy tanggung jawabnya ter isolate dan function nya reusable
const { findProduct, findProductById, insertProduct, editProduct, findProductByName } = require("./product.repository")
const { getCategoryById } = require("../category/category.service")

const getAllProducts = async() => {
    const products = await findProduct()
    return products
}

const getProductById = async (id) => {
    const product = await findProductById(id)

    if(!product){
        throw Error("product not found")
    }
    return product
}

const createProduct = async(newProductData) => {
    const findProduct = await findProductByName(newProductData.name)
    if(findProduct){
        throw new Error("name has to be unique")
    }

    const findCategory = await getCategoryById(newProductData.categoryId)
    if(!findCategory){
        throw new Error("category not found")
    }

    const product = await insertProduct(newProductData)
    return product
}

const deleteProductById = async(id) => {
    await getProductById(id)

    await deleteProductById(id) 
}

const editProductById = async (id, productData) => {
    await getProductById(id)

    const findCategory = await getCategoryById(productData.categoryId)
    if(!findCategory){
        throw new Error("category not found")
    }

    const product = await editProduct(id, productData)
    return product
}


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    deleteProductById,
    editProductById
}