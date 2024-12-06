const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./routes/userRoutes');
const transactionRoutes = require('./routes/transactionsRoutes');
const budgetRoutes = require('./routes/budgetsRoutes');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors()); 
app.use(bodyParser.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/budgets', budgetRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
