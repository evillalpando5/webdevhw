const mysql = require('mysql2');

// Set up a connection pool
const pool = mysql.createPool({
    host: '45.55.136.114',
    user: 'villalpandoe_f2024',
    database: 'villalpandoe_f20',
    password: 'd0n0tsn0w!'
});
// Export the promise-based pool
module.exports = pool.promise(); // Use 'promise()', not 'promises()'
