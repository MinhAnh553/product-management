const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const flash = require('express-flash');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const moment = require('moment');

const datbase = require('./config/database');
const routeAdmin = require('./routes/admin/indexRoute');
const route = require('./routes/client/indexRoute');
const system = require('./config/system');
require('dotenv').config();

// Khai báo app, port
const app = express();
const port = process.env.PORT;

// Method
app.use(methodOverride('_method'));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// Database
datbase.connect();

// Flash (noti)
app.use(cookieParser('keyboard cat'));
app.use(session({ cookie: { maxAge: 60000 } }));
app.use(flash());

// Config view
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

// Config static file
app.use(express.static(__dirname + '/public'));

// Biến
app.locals.prefixAdmin = system.prefixAdmin;
app.locals.moment = moment;

/* New Route to the TinyMCE Node module */
app.use(
    '/tinymce',
    express.static(path.join(__dirname, 'node_modules', 'tinymce'))
);

// Route
routeAdmin(app);
route(app);

app.listen(port, () => {
    console.log(`Project back-end running at http://localhost:${port}...`);
});
