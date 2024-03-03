const express = require("express")
const dotenv = require("dotenv")
const app = express()
const { PrismaClient } = require("@prisma/client")
const response = require("../response")

const prisma = new PrismaClient() // cs prismaclient adlh sebuah class

dotenv.config()

const PORT = process.env.PORT

app.use(express.json()) // for body parser, agar bisa baca req body

app.get("/api", (req, res) => {
    res.send("Hello dunia")
})

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany()
    // prisma.$executeRaw("SELECT * FROM product") ini kalo mau pake manual
    // res.send(products)
    response(200, products, "success get all data", res)
})

app.get("/products/:id", async (req, res) => {
    const productId = req.params.id
    const product = await prisma.product.findUnique({   // bole pake findUnique() ataupun finFirst()
        where:{
            id: parseInt(productId)
        }
    })

    if(!product){
        return res.status(404).send("product not found")
    }
    response(200, product, "get data product by id " + productId, res)
})

app.post("/products", async(req, res) => {
    const newProductData = req.body
    const product = await prisma.product.create({
        data: {
            name: newProductData.name,
            price: newProductData.price,
            description: newProductData.description,
            image: newProductData.image
        },
    })

    response(201, product, "success add data", res)
})

app.delete("/products/:id", async (req, res) => {
    const productId = req.params.id // string
    
    await prisma.product.delete({
        where:{
            id: parseInt(productId),
        },
    })
    response(201, productId, "success delete product", res)
})

app.put("/products/:id", async (req, res) => {
    const productId = parseInt(req.params.id)
    const productData = req.body

    if(!(productData.image && productData.name && productData.price && productData.description)){
        return res.status(400).send("some fields are missing") // dikasih return biar program nggak lanjut baca ke bawah
    }
    const product = await prisma.product.update({
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        },
        where: {
            id : productId,
        },
    })
    response(200, product, "success update data with id "+productId, res)
})

app.patch("/products/:id", async(req, res) => {
    // sama spt put, hanya saja bisa ngeubah sesuai dengan yg ada di body
    const productId = parseInt(req.params.id)
    const productData = req.body

    const product = await prisma.product.update({
        data: {
            name: productData.name,
            price: productData.price,
            description: productData.description,
            image: productData.image,
        },
        where: {
            id : productId,
        },
    })
    response(200, product, "success update data with id "+productId, res)
})

app.listen(PORT, () => {
    console.log(`express API running in port ${PORT}`)
})