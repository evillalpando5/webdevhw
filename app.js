const express = require('express');
// const = require('express-handlebars');
const bodyParser = require('body-parser');
const routes = require('./routes/budget'); // Import the routes file
const pool = require('./util/database'); // Import the MySQL connection pool
const { engine } = require('express-handlebars'); // Import 'engine' from express-handlebars
const app = express();

// Set up Handlebars as the view engine
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'mainLayout',
    defaultLayouts: 'layouts'}));
app.set('view engine', 'hbs');

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the "public" folder

// Use the routes
app.use('/', routes); // Use the routes defined in routes.js

// Error handling (optional)
app.use((req, res) => {
    res.status(404).render('404',
        { pageTitle: '404',
                    message: 'Oops! Page Not Found' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
