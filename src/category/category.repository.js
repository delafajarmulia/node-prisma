const prisma = require("../db/index")

const findCategories = async() => {
    const categories = await prisma.category.findMany()
    return categories
}

const findCategoryById = async(id) => {
    const category = await prisma.category.findUnique({
        where:{
            id: id,
        },
    })
    return category
}

const findCategoryByName = async(name)  => {
    const category = await prisma.category.findFirst({
        where: {
            name: name,
        },
    })

    return category
}

const insertCategory = async (newDataCategory) => {
    const category = await prisma.category.create({
        data: {
            name: newDataCategory.name,
        },
    })

    return category
}

module. exports = {
    findCategories,
    findCategoryById,
    findCategoryByName,
    insertCategory
}