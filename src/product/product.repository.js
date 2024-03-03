// berkomunikasi degn database
// boleh pake ORM / query
// supaya kalo mau ganti" ORM tinggal ubah file ini aja
const prisma = require("../db/index")

const findProduct = async() => {
    const product = await prisma.product.findMany()
    return product
}

const findProductById = async(id) => {
    const product = await prisma.product.findUnique({
        where:{
            id: id,
        },
    })
    return product
}

const findProductByName = async(name) => {
    const product = await prisma.product.findFirst({
        where:{
            name:name,
        },
    })
    return product
}

const insertProduct = async(newDataProduct) => {
    const product = await prisma.product.create({
        data:{
            name: newDataProduct.name,
            price: newDataProduct.price,
            description: newDataProduct.description,
            image:newDataProduct.image,
        },
    })

    return product
}

const deleteProduct = async(id) => {
    await prisma.product.delete({
        where:{
            id: id,
        },
    })

    return 
}

const editProduct = async(id, productData) => {
    const product = await prisma.product.update({
        data:{
            name: productData.name,
            description:productData.description,
            price: productData.price,
            image:productData.image,
        },
        where:{
            id: id,
        },
    })

    return product
}

module.exports = {
    findProduct,
    findProductById,
    findProductByName,
    insertProduct,
    deleteProduct,
    editProduct
}