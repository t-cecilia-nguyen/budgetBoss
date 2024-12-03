const express = require('express');
const db = require('../database');
const router = express.Router();

// Add a new transaction
router.post('/', (req, res) => {
    const { userId, amount, type, category, date } = req.body;

    // Validate the fields
    if (!userId || !amount || !type || !category || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Insert into database
    const query = `
        INSERT INTO transactions (user_id, amount, type, category, date)
        VALUES (?, ?, ?, ?, ?)
    `;
    db.run(query, [userId, amount, type, category, date], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error adding transaction', error: err.message });
        }
        res.status(201).json({ message: 'Transaction added successfully', transactionId: this.lastID });
    });
});

// Get all transactions for a user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `SELECT * FROM transactions WHERE user_id = ? ORDER BY date DESC`;
    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Error fetching transactions', error: err.message });
        }
        res.json(rows);
    });
});

// Update a transaction
router.put('/:id', (req, res) => {
    const transactionId = req.params.id;
    const { amount, type, category, date } = req.body;

    // Validate fields
    if (!amount || !type || !category || !date) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const query = `
        UPDATE transactions
        SET amount = ?, type = ?, category = ?, date = ?
        WHERE id = ?
    `;
    db.run(query, [amount, type, category, date, transactionId], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error updating transaction', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction updated successfully' });
    });
});

// Delete a transaction
router.delete('/:id', (req, res) => {
    const transactionId = req.params.id;

    const query = `DELETE FROM transactions WHERE id = ?`;
    db.run(query, [transactionId], function (err) {
        if (err) {
            return res.status(500).json({ message: 'Error deleting transaction', error: err.message });
        }
        if (this.changes === 0) {
            return res.status(404).json({ message: 'Transaction not found' });
        }
        res.json({ message: 'Transaction deleted successfully' });
    });
});

module.exports = router;
