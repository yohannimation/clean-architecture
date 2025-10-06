// routes/damRoutes.js
const express = require('express');
const multer = require('multer');
const UploadMediaUseCase = require('../usecases/UploadMediaUseCase');

module.exports = (mediaRepo, mdmOrchestrator) => {
    const router = express.Router();

    const storage = multer.diskStorage({
        destination: (req, file, cb) => cb(null, 'uploads/'),
        filename: (req, file, cb) => cb(null, file.originalname)
    });

    const upload = multer({ storage });
    const uploadMediaUseCase = new UploadMediaUseCase(mediaRepo, mdmOrchestrator);

    router.post('/upload', upload.single('file'), async (req, res) => {
        try {
            const media = await uploadMediaUseCase.execute(req.file);
            res.status(201).json(media);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    });

    router.get('/medias', (req, res) => {
        res.json(mediaRepo.findAll());
    });

    router.get('/medias/:ean/:sku', (req, res) => {
        const medias = mediaRepo.findByEanSku(req.params.ean, req.params.sku);
        res.json(medias);
    });

    return router;
};
