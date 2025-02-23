const express = require('express');
const { PrismaClient } = require('@prisma/client');
// const auth=require('./Auth')

const prisma = new PrismaClient();
const BookRoutes = express.Router();

BookRoutes.post('/book', async (req, res) => {
    try {
        let { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

        if (!book_name || !book_cat_id || !book_collection_id || !book_launch_date || !book_publisher) {
            return res.status(400).json({ error: "All fields are required" });
        }

        const parsedDate = new Date(book_launch_date);
        if (isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const book = await prisma.book.create({
            data: {
                book_name,
                book_cat_id,
                book_collection_id,
                book_launch_date: parsedDate,
                book_publisher
            },
        });

        res.status(201).json(book);
    } catch (error) {
        console.error('Error creating book:', error);
        res.status(500).json({ error: 'Failed to create book' });
    }
});

BookRoutes.put('/book/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;

        const bookExists = await prisma.book.findUnique({
            where: { book_id: parseInt(id) },
        });

        if (!bookExists) {
            return res.status(404).json({ error: "Book not found" });
        }

        let parsedDate = book_launch_date ? new Date(book_launch_date) : null;
        if (book_launch_date && isNaN(parsedDate.getTime())) {
            return res.status(400).json({ error: "Invalid date format" });
        }

        const updatedBook = await prisma.book.update({
            where: { book_id: parseInt(id) },
            data: {
                book_name,
                book_cat_id,
                book_collection_id,
                book_launch_date: parsedDate,
                book_publisher
            },
        });

        res.status(200).json(updatedBook);
    } catch (error) {
        console.error('Error updating book:', error);
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Book not found' });
        }
        res.status(500).json({ error: 'Failed to update book' });
    }
});

BookRoutes.get('/books', async (req, res) => {
    try {
        const books = await prisma.book.findMany();
        res.status(200).json(books);
    } catch (error) {
        console.error("Database Fetch Error:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


BookRoutes.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: { book_id: parseInt(id) }
        });

        if (!book) {
            return res.status(404).json({ error: "Book not found" });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error("Error fetching book:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports = BookRoutes;
