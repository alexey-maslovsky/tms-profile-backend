const express = require('express');
const bodyParser = require('body-parser');
const registerApiRoutes = require('./src/routes/registerApiRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/api', registerApiRoutes());

app.listen('5555', () => {
  console.log('Server started on port 5555');
});
