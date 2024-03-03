// service tujuannya untuk heandle bussiness logic 
// spy tanggung jawabnya ter isolate dan function nya reusable
const prisma = require("../db/index")
const { findProduct, findProductById, insertProduct, editProduct } = require("./product.repository")

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
    const findProduct = await findProductName(newProductData.name)
    if(findProduct){
        throw new Error("name has to be unique")
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