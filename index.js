const express = require('express');
const datbase = require('./config/database');
const routeAdmin = require('./routes/admin/index.route');
const route = require('./routes/client/index.route');
const system = require('./config/system');
require('dotenv').config();

// Khai báo app, port
const app = express();
const port = process.env.PORT;

// Database
datbase.connect();

// Config view
app.set('views', './views');
app.set('view engine', 'pug');

// Config static file
app.use(express.static('public'));

// Biến
app.locals.prefixAdmin = system.prefixAdmin;

// Route
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`Project back-end running at http://localhost:${port}...`);
});
