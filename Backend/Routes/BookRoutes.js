const express = require('express');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();
const BookRoutes = express.Router();

BookRoutes.post('/book', async (req, res) => {
    try {
        let { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher }=req.body;
        const dateParts=book_launch_date.split('-');  
        book_launch_date=new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

        if (isNaN(book_launch_date.getTime())) {
            return res.status(400).json({error: "Invalid date format. Use 'DD-MM-YYYY'."});
        }

        const book=await prisma.book.create({
            data: {
                book_name,
                book_cat_id,
                book_collection_id,
                book_launch_date,
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
        const { book_name, book_cat_id, book_collection_id, book_launch_date, book_publisher } = req.body;
        const { id } = req.params;

        let newBookLaunchDate = null;
        if (book_launch_date) {
            const dateParts = book_launch_date.split('-');  
            newBookLaunchDate = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

            if (isNaN(newBookLaunchDate.getTime())) {
                return res.status(400).json({ error: "Invalid date format. Use 'DD-MM-YYYY'." });
            }
        }

        const book = await prisma.book.update({
            where: { book_id: parseInt(id) }, 
            data: {
                book_name,
                book_cat_id,
                book_collection_id,
                book_launch_date: newBookLaunchDate, 
                book_publisher
            },
        });

        res.status(200).json(book);  
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
        res.status(500).json({ error: "Internal server error" });
  }
  
});

BookRoutes.get('/books/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const book = await prisma.book.findUnique({
            where: { book_id: parseInt(id) }
        });

        res.status(200).json(book);
      } catch (error) {
        res.status(500).json({ error: "Internal server error"});
  }
  
});

module.exports = BookRoutes;
