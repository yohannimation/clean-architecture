const fs = require('fs');
const path = require('path');

class LocalFileStorage {
    constructor(basePath = 'uploads') {
        this.basePath = basePath;
        if (!fs.existsSync(basePath)) fs.mkdirSync(basePath, { recursive: true });
    }

    async store(filename, tempPath) {
        const targetPath = path.join(this.basePath, filename);
        await fs.promises.rename(tempPath, targetPath);
        return { filename, path: targetPath };
    }

    async getFile(filename) {
        const filePath = path.join(this.basePath, filename);
        if (!fs.existsSync(filePath)) throw new Error('File not found');
        return fs.createReadStream(filePath);
    }
}

module.exports = LocalFileStorage;
