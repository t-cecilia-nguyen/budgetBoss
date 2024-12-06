const express = require('express');
const db = require('../database');
const router = express.Router();

// POST new budget
router.post('/', (req, res) => {
    const {userId, amount, startDate, endDate,  category, notes} = req.body;

    // Perform validation check for user input
    if (!userId || !amount || !startDate || !endDate || !category || !notes) {
        return res.status(400).json({message: 'All fields are required.'});
    }

    // Insert into db
    const query = `
        INSERT INTO budgets (user_id, amount, start_date, end_date, category, notes)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.run(query, [userId, amount, startDate, endDate, category, notes], function (err) {
        if (err) {
            return res.status(500).json({message: 'An error occured while adding budget', error: err.message});
        }

        res.status(201).json({message: 'Budget has been added successfully.', budgetId: this.lastID});
    });
});

// GET all budgets for user
router.get('/:userId', (req, res) => {
    const userId = req.params.userId;

    const query = `SELECT * FROM budgets WHERE user_id = ? ORDER BY start_date DESC`;

    db.all(query, [userId], (err, rows) => {
        if (err) {
            return res.status(500).json({message: 'An error occured while fetching budgets', error: err.message});
        }

        res.json(rows);
    });
});

// GET budget by ID
router.get('/budget/:id', (req, res) => {
    const budgetId = req.params.id;

    const query = `SELECT * FROM budgets WHERE id = ?`;

    db.get(query, [budgetId], (err, row) => {
        if (err) {
            return res.status(500).json({message: 'An error occured while fetching the budget', error: err.message});
        }

        if (!row) {
            return res.status(404).json({message: 'Budget could not be found.'});
        }

        res.json(row);
    });
});

// UPDATE a budget
router.put('/:id', (req, res) => {
    const budgetId = req.params.id;

    const { amount, startDate, endDate, category, notes} = req.body;

    if (!startDate || !endDate || !amount || !category || !notes) {
        return res.status(400).json({message: 'All fields are required.'});
    }

    const query = `
        UPDATE budgets
        SET amount = ?, start_date = ?, end_date = ?, category = ?, notes = ?
        WHERE id = ?
    `;

    db.run(query, [amount, startDate, endDate, category, notes, budgetId], function (err) {
        if (err) {
            return res.status(500).json({message: 'An error occured while updating the budget', error: err.message});
        }

        if (this.changes === 0) {
            return res.status(404).json({message: 'Budget could not be found.'});
        }

        res.json({message: 'Budget has been updated successfully.'});
    });
});

// DELETE a budget
router.delete('/:id', (req, res) => {
    const budgetId = req.params.id;

    const query = `DELETE FROM budgets WHERE id = ?`;

    db.run(query, [budgetId], function (err) {
        if (err) {
            return res.status(500).json({message: 'An error occured while deleting the budget', error: err.message});
        }

        if (this.changes === 0) {
            return res.status(404).json({message: 'Budget could not be found.'});
        }

        res.json({message: 'Budget has been deleted successfully.'});
    });
});

module.exports = router;