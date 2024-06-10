const { PrismaClient } = require("@prisma/client");
const { connect } = require("../router/postRouter");
const prisma = new PrismaClient();

// create
const create = async (req, res) => {
    const { name } = req.body;

    const data = { name }

    try {
        const tags = await prisma.tag.create({ data });
        res.status(200) .json(tags);
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

// Index
const index = async (req, res) => {
    try {
        const tags = await prisma.tag.findMany();
        res.json(tags)
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

// Show
const show = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const tag = await prisma.tag.findUnique({
            where: { id }
        });
        if (tag) {
            res.json(tag);
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
        const tag = await prisma.tag.update({
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
        await prisma.tag.delete({
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