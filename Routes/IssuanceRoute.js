const express = require('express');
const { PrismaClient } = require('@prisma/client');
// const auth=require('./Auth')

const prisma = new PrismaClient();
const IssuanceRoute = express.Router();

IssuanceRoute.post('/issuance',async (req, res) => {
    try {
        let { book_id, issuance_member, issuance_date, issued_by, target_return_date, issuance_status } = req.body;

        const dateParts1 = issuance_date.split('-');
        const dateParts2 = target_return_date.split('-');

        issuance_date = new Date(`${dateParts1[2]}-${dateParts1[1]}-${dateParts1[0]}`);
        target_return_date = new Date(`${dateParts2[2]}-${dateParts2[1]}-${dateParts2[0]}`);

        if (isNaN(issuance_date.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Use 'DD-MM-YYYY'." });
        }
        if (isNaN(target_return_date.getTime())) {
            return res.status(400).json({ error: "Invalid date format. Use 'DD-MM-YYYY'." });
        }

        const issuances = await prisma.issuance.create({
            data: { book_id, issuance_member, issuance_date, issued_by, target_return_date, issuance_status },
        });

        res.status(201).json(issuances);
    } catch (error) {
        console.error('Error creating issuance:', error);
        res.status(500).json({ error: 'Failed to create issuance' });
    }
});

IssuanceRoute.put('/issuance/:id', async (req, res) => {
    try {
        const { book_id, issuance_member, issuance_date, issued_by, target_return_date, issuance_status } = req.body;
        const { id } = req.params;

        let new_issuance_date = null;
        if (issuance_date) {
            const dateParts = issuance_date.split('-');  
            new_issuance_date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

            if (isNaN(new_issuance_date.getTime())) {
                return res.status(400).json({ error: "Invalid date format. Use 'DD-MM-YYYY'." });
            }
        }

        let new_target_date = null;
        if (target_return_date) {
            const dateParts = target_return_date.split('-');  
            new_target_date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`);

            if (isNaN(new_target_date.getTime())) {
                return res.status(400).json({ error: "Invalid date format. Use 'DD-MM-YYYY'." });
            }
        }

        const issuance = await prisma.issuance.update({
            where: { issuance_id: parseInt(id) }, 
            data: {
                book_id,
                issuance_member,
                issuance_date: new_issuance_date.toISOString(), 
                issued_by,
                target_return_date: new_target_date.toISOString(), 
                issuance_status
            },
        });

        res.status(200).json(issuance);  
    } catch (error) {
        console.error('Error updating issuance:', error);
        
        if (error.code === 'P2025') {
            return res.status(404).json({ error: 'Issuance not found' });
        }

        res.status(500).json({ error: 'Failed to update issuance' });
    }
});

IssuanceRoute.get('/issuances', async (req, res) => {
    try {
        const list = await prisma.issuance.findMany();
        res.status(200).json(list);
      } catch (error) {
        res.status(500).json({ error: "Internal server error"});
  }
  
});


module.exports = IssuanceRoute;  
