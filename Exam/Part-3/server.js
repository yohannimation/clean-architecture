// server.js
const express = require('express');
const bodyParser = require('body-parser');
const pimRoutes = require('./src/routes/pimRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/pim', pimRoutes);

app.listen(3000, () => {
    console.log('MDM API running on http://localhost:3000');
});
