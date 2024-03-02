const express = require("express")
const dotenv = require("dotenv")
const app = express()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient() // cs prismaclient adlh sebuah class

dotenv.config()

const PORT = process.env.PORT

app.use(express.json()) // for body parser, agar bisa baca req body

app.get("/api", (req, res) => {
    res.send("Hello dunai")
})

app.get("/products", async (req, res) => {
    const products = await prisma.product.findMany()
    // prisma.$executeRaw("SELECT * FROM product") ini kalo mau pake manual
    res.send(products)
})

// app.get("/product/:id", async (req, res) => {
//     const id = req.params.id
//     const products = await prisma.product.findMany({
//         where:{
//             id: id
//         }
//     })
//     res.send(products)
// })

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

    res.status(201).send("create product success")
})

app.listen(PORT, () => {
    console.log(`express API running in port ${PORT}`)
})