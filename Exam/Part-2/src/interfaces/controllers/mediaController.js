const express = require('express');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

function MediaController(mediaUseCases, fileStorage) {
    const router = express.Router();

    router.post('/upload', upload.single('file'), async (req, res) => {
        try {
            const { originalname, path } = req.file;

            // Sauvegarder avec le nom original
            const storedFile = await fileStorage.store(originalname, path);

            // Associer automatiquement au produit
            const media = await mediaUseCases.linkMediaToProduct(originalname);

            res.json({ success: true, media });
        } catch (err) {
            res.status(400).json({ error: err.message });
        }
    });

    return router;
}

module.exports = MediaController;
