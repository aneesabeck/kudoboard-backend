// book example
// npx prisma migrate dev --name init_books
//everytime you make a change to the prisma you have to migrate

const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const cors = require('cors')
const express = require('express')
const PORT = 3000

const app = express()
app.use(express.json())
app.use(cors())

app.get("/boards", async (req, res) => {
    const boards = await prisma.board.findMany()
    res.status(200).json(boards)
})


app.post("/boards", async (req, res) => {
    const { imgUrl, title, category, author} = req.body
    const newBoard = await prisma.board.create({
        data: {
            imgUrl,
            title,
            category,
            author
        }
    });
    res.json(newBoard)
})


app.delete("/boards/:id", async (req,res) => {
    const id = parseInt(req.params.id)
    let boards = await prisma.board.findMany()
    const initialLength = boards.length
    const boardToDelete = boards.find((board) => board.id === id)
    boards = boards.filter(board => board.id !== id)

    if (boards.length < initialLength) {
        res.json(boardToDelete)
        await prisma.board.delete({
            where : { id: id }
        })
    } else {
        res.json({error: "not found"})
    }
})

app.get("/boards/search", async (req, res) => {
    const { title, category } = req.query
    let whereClause = {}
    if (title) whereClause.title = { contains: title }
    if (category) whereClause.category = { equals: category }
    try {
        const boards = await prisma.board.findMany({
            where: whereClause,
        })
        res.json(boards)
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.get("/boards/sort", async (req, res) => {
    try {
        const boards = await prisma.board.findMany({
            orderBy: {
                id: 'desc',
            },
            take: 5,
        })
        res.json(boards)
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.get("/boards/:id", async (req, res) => {
    const { id } = req.params
    const board = await prisma.board.findUnique({
        where: { id: parseInt(id) },
        include: { cards: true }
    })
    res.json(board)
})

app.get("/boards/:id/cards", async (req, res) => {
    const { id } = req.params
    try {
        const cards = await prisma.card.findMany({
            where: { boardId: parseInt(id) }
        })
        res.json(cards)
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.post("/boards/:id/cards", async (req, res) => {
    const { id } = req.params;
    const { title, description, gifUrl, author } = req.body
    try {
        const newCard = await prisma.card.create({
            data: {
                title,
                description,
                gifUrl,
                author,
                boardId: parseInt(id)
            }
        })
        res.json(newCard)
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.post('/cards/:id/upvote', async (req, res) => {
    const { id } = req.params
    try {
        const updatedCard = await prisma.card.update({
            where: { id: parseInt(id) },
            data: {
                upvotes: {
                    increment: 1,
                },
            },
        })
        res.json(updatedCard)
    } catch (error) {
        res.status(500).send('server error')
    }
})

app.delete('/cards/:id', async (req, res) => {
    const id = parseInt(req.params.id)
    let cards = await prisma.card.findMany()
    const initialLength = cards.length
    const cardToDelete = cards.find((card) => card.id === id)
    cards = cards.filter(cards => cards.id !== id)

    if (cards.length < initialLength) {
        res.json(cardToDelete)
        await prisma.card.delete({
            where : { id: id }
        })
    } else {
        res.json({error: "not found"})
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
})