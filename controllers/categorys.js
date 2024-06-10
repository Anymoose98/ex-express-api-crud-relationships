const { PrismaClient } = require("@prisma/client");
const { connect } = require("../router/postRouter");
const prisma = new PrismaClient();

// create
const create = async (req, res) => {
    const { name } = req.body;

    const data = { name }

    try {
        const category = await prisma.category.create({ data });
        res.status(200) .json(category);
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

// Index
const index = async (req, res) => {
    try {
        const categorys = await prisma.category.findMany();
        res.json(categorys)
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

// Show
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.findUnique({
            where: { id }
        });
        if (category) {
            res.json(category);
        } else {
            res.status(404).json({ error: "Categoria non trovata" });
        }
    }
    catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

// Update
const update = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const category = await prisma.category.update({
            where: { id },
            data: req.body,
        });
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

const destroy = async(req, res) => {
    try {
        const id = parseInt(req.params.id)
        await prisma.category.delete({
            where: {id},
        })
        res.json('Categoria eliminata')
    }catch(err){
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

module.exports = {
    create,
    index,
    show,
    update,
    destroy
}