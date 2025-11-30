const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { findUserByEmail, createUser } = require('../models/userModel');
const router = express.Router();

// Registrar usuário
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({
            error: true,
            message: "Nome, email e senha são obrigatórios"
        });
    }

    findUserByEmail(email, (err, user) => {
        if (err) return res.status(500).json({ error: "Erro ao acessar o DB" });

        if (user) {
            return res.status(400).json({ message: 'Email já cadastrado' });
        }

        createUser({ name, email, password, role }, (err, newUser) => {
            if (err) return res.status(500).json({ error: "Erro ao criar usuário" });
        
            res.status(201).json({
                message: "Usuário criado com sucesso",
                user: newUser
            });
        });
    });
});

// Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    findUserByEmail(email, async (err, user) => {
        if (err) return res.status(500).json({ error: "Erro no DB" });

        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) return res.status(401).json({ message: 'Senha incorreta' });

        const token = jwt.sign(
            { id: user.id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({ message: 'Login bem-sucedido', token });
    });
});

module.exports = router;