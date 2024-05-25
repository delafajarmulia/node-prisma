// layer untuk handle request & response
// handle vallidasi body
const express = require('express')
const response = require("../response")
const { getAllProducts, getProductById, createProduct, deleteProductById, editProductById } = require('./product.service')

const router = express.Router()

router.get("/", async (req, res) => {
    // const products = await prisma.product.findMany()
    // prisma.$executeRaw("SELECT * FROM product") ini kalo mau pake manual
    // res.send(products)
    const products = await getAllProducts()
    if(!products){
        response(400, res, "products not found", res)
    }
    response(200, products, "success get all data", res)
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)

        if(typeof productId !== "number"){
            return response(400, newProductData, "Id must be a number", res)
        }
        
        const product = await getProductById(productId)
    
        response(200, product, "get data product by id " + productId, res)
    } catch (err) {
        res.status(404).send(err.message)
    }
})

router.post("/", async(req, res) => {
    try {
        const newProductData = req.body
        const categoryId = newProductData.categoryId
        if(typeof categoryId !== "number" || typeof newProductData.price !== "number"){
            return response(400, newProductData, "price and category Id must be a number", res)
        } else if (newProductData.name ==="" || newProductData.price ==="" || newProductData.categoryId ===""){
            return response(400, newProductData, "name, price, and categoryId must be available", res)
        }

        const product = await createProduct(newProductData)
    
        response(201, product, "success add data", res)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.delete("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id) // string
        await deleteProductById(productId)
        
        response(201, "success delete product", "success delete product", res) 
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.put("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)
        const productData = req.body
    
        if(!(productData.name & productData.price & productData.description & productData.image)){
            throw Error("some fields are missing")
        }

        const product = await editProductById(productId, productData)
        response(200, product, "success update data with id "+productId, res)       
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.patch("/:id", async(req, res) => {
    // sama spt put, hanya saja bisa ngeubah sesuai dengan yg ada di body
    try {
        const productId = parseInt(req.params.id)
        const productData = req.body

        const product = await editProductById(productId, productData)
        response(200, product, "success update data with id "+productId, res)       
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router