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
    res.redirect('/articulos');
});

router.get('/', async (req, res) => {
    const articulos = await pool.query('SELECT * FROM articulos');
    console.log(articulos);
    res.render('articulos/list', { articulos });
});

router.get('/eliminar/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM articulos WHERE ID = ?', [id]);
    res.redirect('/articulos');
});

router.get('/editar/:id', async (req, res) => {
    const {id} = req.params;
    const articulos = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
    res.render('articulos/editar', {articulo: articulos[0]});
});

router.post('/editar/:id', async (req, res) =>{
    const {id} = req.params;
    const {nombre, grupo, año} = req.body;
    const newArticulo = {
        nombre,
        grupo,
        año
    };
    console.log(newArticulo);
    await pool.query('UPDATE articulos SET ? WHERE id = ?', [newArticulo, id]);
    res.redirect('/articulos');
});

module.exports = router;