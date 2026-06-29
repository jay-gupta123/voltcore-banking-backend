const express = require('express');

const app = express();
const cookies = require('cookie-parser');

app.use(express.json());
app.use(cookies());

/**
 * - Routes required
 */

const authRoute = require('./Routes/auth.route');
const accountroute = require('./Routes/account.route');

/**
 * - Use Routes
 */

app.use('/api/auth', authRoute);
app.use('/api/account', accountroute);


module.exports = app;