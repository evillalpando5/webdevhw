const Transaction = require('../models/Transaction');


exports.renderHome = async (req, res) => {
    Transaction.getIncome()
        .then(([incomeTotal]) => {
            let income = incomeTotal[0]['COALESCE(SUM(amount), 0)']
            Transaction.getExpense()
                .then(([expenseTotal]) => {
                    let expenses = expenseTotal[0]['COALESCE(SUM(amount), 0)']
                    let balance = income - expenses
                    res.render("home", {
                        income: income,
                        expenses: expenses,
                        balance: balance
                    })
                })
    })
};

exports.renderAddTransactionForm = (req, res) => {
    res.render("addTransaction", {
        pageHeader: 'Add New Product'});
};
exports.addTransaction = async (req, res) => {
    let transaction = new Transaction(req.body.type, req.body.amount, req.body.category, req.body.date, req.body.description);
    transaction.addTransaction()
        .then(([transactions, fields]) => {
            // let products = Product.fetchAll();
            Transaction.fetchAll()
                .then(([transactions, fields]) => {
                    let hasTransactions = false;
                    if (transactions.length > 0) hasTransactions = true;
                    res.render('transactions', {
                        hasTransactions: hasTransactions,
                        transactions: transactions
                    });
                });
        });
};

exports.renderEditTransactionForm = async (req, res) => {
    let id = req.params.id;
    console.log( "made it to Update  id:" +id);
    // let product = Product.getItem(id);
    let transaction = Transaction.findById( id )
        .then(([transaction, fields]) => {
            let gotUpdate = false;
            console.log("---UPDATE transaction1=");
            console.log( transaction );
            if (transaction) gotUpdate = true;
            console.log("FLAG1 ----");
            console.log(transaction[0] );
            res.render('editTransaction',
                {
                    gotUpdate: gotUpdate,
                    transaction: transaction[0],
                    id: id
                })
        })
};
exports.updateTransaction = async (req, res) => {
    let id = req.body.id;
    console.log("updatingggg----------")
    let transaction = new Transaction(req.body.type, req.body.amount, req.body.category, req.body.date, req.body.description);
    console.log("------- CHANGES ---------")
    transaction.updateTransaction( id )
        .then(([transaction, fields]) => {
            console.log("Updating transaction2=");
            console.log(transaction);
            res.redirect('/transactions');
        });
};

exports.deleteTransaction = async (req, res) => {
    let id = req.params.id;
    Transaction.delete(id)
        .then(([transactions, fields]) => {
            res.redirect('/transactions');
        })
};

exports.getTransactions = (req, res) => {
    Transaction.fetchAll()
        .then(([transactions, fields]) => {
            let hasTransactions = false;
            if ( transactions.length > 0) hasTransactions = true;
            res.render('transactions', {
                hasTransactions: hasTransactions,
                transactions : transactions});
        })
        .catch((err) => {
            console.error('Error fetching products:', err);
        });
}
