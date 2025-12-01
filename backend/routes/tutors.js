var express = require('express');
var router = express.Router();
var authenticateToken = require('../middleware/auth');
var { getTutors, findTutorById, createTutor, updateTutor, deleteTutor } = require('../models/tutorModel');


router.get('/', authenticateToken, function(req, res) {
    getTutors((err, tutors) => {
        if (err) {
            return res.status(500).json({ error: 'Erro ao buscar tutores' });
        }
        res.status(200).json({ tutors: tutors });
    });
});


router.get('/:id', authenticateToken, function(req, res) {
    findTutorById(req.params.id, (err, tutor) => {
        if (err) return res.status(500).json({ error: 'Erro ao buscar tutor' });
        if (!tutor) return res.status(404).json({ error: 'Tutor não encontrado' });
        res.status(200).json({ tutor: tutor });
    });
});


router.post('/', authenticateToken, function(req, res) {
    const tutorData = req.body;
    createTutor(tutorData, (err, newTutor) => {
        if (err) return res.status(500).json({ error: 'Erro ao criar tutor' });
        res.status(201).json({ message: 'Tutor criado com sucesso', tutor: newTutor });
    });
});


router.put('/:id', authenticateToken, function(req, res) {
    const id = req.params.id;
    const tutorData = req.body;
    updateTutor(id, tutorData, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao atualizar tutor' });
        res.status(200).json({ message: 'Tutor atualizado com sucesso' });
    });
});


router.delete('/:id', authenticateToken, function(req, res) {
    deleteTutor(req.params.id, (err) => {
        if (err) return res.status(500).json({ error: 'Erro ao deletar tutor' });
        res.status(200).json({ message: 'Tutor deletado com sucesso' });
    });
});

module.exports = router;