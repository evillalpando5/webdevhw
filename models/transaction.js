const db = require("../util/database");

module.exports = class Transaction {
    constructor(type, amount, category, date, description) {
        this.type = type;
        this.amount = amount;
        this.category = category;
        this.date = date;
        this.description = description;
    }

    addTransaction() {
        console.log(`type:${this.type} amount:${this.amount} category:${this.category} date:${this.date} desc: ${this.description}`)
        return db.execute('insert into transactions (type, amount, category, date, description) ' +
            'values (?, ?, ?, ?, ?)',
            [this.type, this.amount, this.category, this.date, this.description]
        )
    }

    static delete(id) {
        return db.execute("delete from transactions where id = ?",
            [id]
        )
    }
    static findById( id ){
        return db.execute( "select * from transactions where id = ?",
            [id] );
    }

    static fetchAll(){
        return db.execute( "select * from transactions");
    }
    static getIncome(){
        return db.execute("select COALESCE(SUM(amount), 0)\n" +
            "from transactions\n" +
            "where type='income'")
    }
    static getExpense(){
        return db.execute("select COALESCE(SUM(amount), 0)\n" +
            "from transactions\n" +
            "where type='expense'")

    }
    updateTransaction ( id ){
        return db.execute( "UPDATE transactions SET type = ?, amount = ?, category = ?, date = ?, description = ?,  WHERE id = ?",
            [this.type, this.amount, this.category, this.date, this.description, id] );
    }
    editTransaction ( id ){
        return db.execute( "UPDATE transactions SET type = ?, amount = ?, category = ?, date = ?, description = ?,  WHERE id = ?",
            [this.type, this.amount, this.category, this.date, this.description, id] );
    }
}