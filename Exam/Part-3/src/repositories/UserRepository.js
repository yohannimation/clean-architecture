// src/repositories/UserRepository.js
const bcrypt = require('bcryptjs');

class UserRepository {
    constructor() {
        this.users = [
            { username: 'admin', passwordHash: bcrypt.hashSync('admin123', 8), role: 'admin' },
            { username: 'user', passwordHash: bcrypt.hashSync('user123', 8), role: 'user' }
        ];
    }

    findByUsername(username) {
        return this.users.find(u => u.username === username);
    }
}

module.exports = UserRepository;
