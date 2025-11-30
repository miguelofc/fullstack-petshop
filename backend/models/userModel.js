const db = require('../db/database');
const bcrypt = require('bcryptjs');

// Buscar usuário por email
function findUserByEmail(email, callback) {
    db.get(
        'SELECT * FROM users WHERE email = ?',
        [email],
        (err, row) => callback(err, row)
    );
}

// Criar usuário com name/email/password/role
async function createUser({ name, email, password, role }, callback) {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        db.run(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [name, email, hashedPassword, role],
            function (err) {
                if (err) return callback(err);

                callback(null, {
                    id: this.lastID,
                    name,
                    email,
                    role
                });
            }
        );

    } catch (error) {
        callback(error);
    }
}

module.exports = { findUserByEmail, createUser };