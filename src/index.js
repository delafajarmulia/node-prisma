const express = require("express")
const dotenv = require("dotenv")
const app = express()

dotenv.config()

const PORT = process.env.PORT

app.use(express.json()) // for body parser, agar bisa baca req body

app.get("/api", (req, res) => {
    res.send("Hello dunia")
})

const productController = require("./product/product.controller")

app.use('/products', productController)

app.listen(PORT, () => {
    console.log(`express API running in port ${PORT}`)
})