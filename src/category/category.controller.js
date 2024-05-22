const express = require('express')
const response = require("../response")
const { getAllCategories, getCategoryById, createCategory } = require("./category.service")

const router = express.Router()

router.get("/", async(req, res) => {
    const categories = await getAllCategories()
    response(200, categories, "success get all data", res)
})

router.get("/:id", async(req, res) => {
    try {
        const categoryId = parseInt(req.params.id)

        if(typeof categoryId !== "number"){
            throw Error("ID must be a number")
        }

        const category = await getCategoryById(categoryId)
        response(200, category, "get category by Id " + categoryId, res)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

router.post("/", async(req, res) => {
    try {
        const newDataCategory = req.body
        const newCategory = await createCategory(newDataCategory)
        response(201, newCategory, "success add new data category", res)
    } catch (err) {
        res.status(400).send(err.message)
    }
})

module.exports = router