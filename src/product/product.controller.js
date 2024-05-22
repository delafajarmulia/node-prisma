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
    response(200, products, "success get all data", res)
})

router.get("/:id", async (req, res) => {
    try {
        const productId = parseInt(req.params.id)

        if(typeof productId !== "number"){
            throw Error("ID is not a number")
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