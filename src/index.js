const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(express.json()) // for body parser, agar bisa baca req body

app.get("/api", (req, res) => {
    res.send("Hello World!")
})

const productController = require("./product/product.controller")
const categoryController = require("./category/category.controller")

app.use('/products', productController)
app.use('/categories', categoryController)

app.listen(PORT, () => {
    console.log(`express API running in port ${PORT}`)
})