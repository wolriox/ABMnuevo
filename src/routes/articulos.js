const express = require('express');
const router = express.Router();

const pool = require('../database');

router.get('/add', (req, res) => {
    res.render('articulos/add');
});

router.post('/add', async (req, res) => {
    const { id, nombre, grupo, año } = req.body;
    const newItem = {
        id,
        nombre,
        grupo,
        año
    };
    await pool.query('INSERT INTO articulos set ?', [newItem]);
    res.send('recibido');
});

router.get('/', async (req, res) => {
    const articulos = await pool.query('SELECT * FROM articulos');
    console.log(articulos);
    res.render('articulos/list', { articulos });
});

module.exports = router;