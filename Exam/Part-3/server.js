// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const ProductRepository = require('./src/repositories/ProductRepository');
const MediaRepository = require('./src/repositories/MediaRepository');
const MdmOrchestrator = require('./src/core/MdmOrchestrator');

const pimRoutes = require('./src/routes/pimRoutes');
const damRoutes = require('./src/routes/damRoutes');
const authRoutes = require('./src/routes/authRoutes');
const { authenticate } = require('./src/middleware/auth');

const app = express();
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// **Instances partagées**
const productRepo = new ProductRepository(); // partagé entre PIM et DAM
const mediaRepo = new MediaRepository();
const mdmOrchestrator = new MdmOrchestrator(productRepo, mediaRepo);

// Routes publiques
app.use('/api/auth', authRoutes);

// Routes protégées
app.use('/api/pim', authenticate, pimRoutes(productRepo));
app.use('/api/dam', authenticate, damRoutes(mediaRepo, mdmOrchestrator));

app.listen(3000, () => {
    console.log('MDM API running on http://localhost:3000');
});
