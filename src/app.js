const express = require('express');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const API_PORT = 3001;

app.use('/', indexRouter);
app.use('/users', usersRouter);

app.listen(API_PORT, () => console.log(`Listening on port ${API_PORT}`));
