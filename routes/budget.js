const express = require('express');
const router = express.Router();
const transactionController = require('../controllers/transactionController');

// Home Page Route
router.get('/', transactionController.renderHome);

// Transactions Page Route
router.get('/transactions', transactionController.getTransactions);

// Add Transaction Routes
router.get('/add', transactionController.renderAddTransactionForm);
router.post('/add', transactionController.addTransaction);

// Edit Transaction Routes
router.get('/edit/:id', transactionController.renderEditTransactionForm);
router.post('/edit/:id', transactionController.updateTransaction);

// Delete Transaction Route
router.get('/delete/:id', transactionController.deleteTransaction);
// Route to handle the update of a transaction
router.post('/update/:id', transactionController.updateTransaction);
module.exports = router;
