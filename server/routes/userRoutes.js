const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../database');
const router = express.Router();

// Signup endpoint
router.post('/signup', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    // Check if the user already exists
    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, row) => {
        if (row) {
        return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        db.run(
        'INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)',
        [firstName, lastName, email, hashedPassword],
        (err) => {
            if (err) {
            return res.status(500).json({ message: 'Error saving user', error: err.message });
            }
            res.status(201).json({ message: 'User created successfully' });
        }
        );
    });
});

// Login endpoint
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find the user with the given email
    db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
        if (err) {
            return res.status(500).json({ message: 'Error retrieving user from database' });
        }

        if (!row) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        bcrypt.compare(password, row.password, (err, isMatch) => {
            if (err) {
                return res.status(500).json({ message: 'Error comparing passwords' });
            }

            if (isMatch) {
                res.status(200).json({ message: 'Login successful', user: { id: row.id, email: row.email } });
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        });
    });
});

module.exports = router;
