const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// Creare un nuovo post
const create = async (req, res) => {
    const { title, slug, image, content, published, category, tags } = req.body;

    const data = {
        title,
        slug,
        image,
        content,
        published: published ? true : false,
        tags: {
            connect: tags ? tags.map(id => ({ id })) : []
        }
    };
    if (category) {
        data.categoryID = category;
    }

    try {
        const post = await prisma.post.create({ data });
        res.status(200).json({ message: 'Post creato con successo', post });
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};

// Mostrare tutti i post
const index = async (req, res) => {
    try {
        const where = {};
        const { published } = req.query;

        if (published === 'false') {
            where.published = false;
        } else if(published === 'true') {
            where.published = true;
        }

        const posts = await prisma.post.findMany({
            where,
            include: {
                _count: {
                    select: { tags: true }
                }
            }
        });

        res.status(200).json({
            data: posts.map(p => ({
                ...p,
                totalTag: p._count.tags,
                _count: undefined
            }))
        });
    } catch (err) {
        console.log("Qualcosa è andato storto", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};

// Mostrare un singolo post
const show = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({
            where: { slug },
            include: {
                category: {
                    select: {
                        name: true
                    }
                },
                tags: {
                    select: {
                        name: true
                    }
                }
            }
        });

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({ error: "Post non trovato" });
        }
    } catch (err) {
        console.log("Errore:", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
}

const update = async (req, res) => {
    try {
        const { slug } = req.params;
        const { title, image, content, published, category, tags } = req.body;

        const data = {
            title,
            image,
            content,
            published,
            categoryID: category
        };

        // Gestione dei tag
        if (tags) {
            data.tags = {
                set: tags.map(id => ({ id })) // Aggiorna i tag esistenti con i nuovi
            };
        }

        const post = await prisma.post.update({
            where: { slug },
            data
        });

        res.status(200).json(post);
    } catch (err) {
        console.log("Errore:", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};
// Eliminare un post
const destroy = async (req, res) => {
    try {
        const { slug } = req.params;
        const post = await prisma.post.findUnique({
            where: { slug }
        });

        if (post) {
            await prisma.post.delete({
                where: { slug }
            });
            res.status(200).json({ message: "Post eliminato con successo" });
        } else {
            res.status(404).json({ error: "Post non trovato" });
        }
    } catch (err) {
        console.error("Errore:", err);
        res.status(500).json({ error: "Qualcosa è andato storto" });
    }
};

module.exports = {
    create,
    index,
    show,
    update,
    destroy
}
