const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth-permisos');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('articulos/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { id, nombre, grupo, año, idProveedor } = req.body;
    const newItem = {
        id,
        nombre,
        grupo,
        año,
        idProveedor
    };
    await pool.query('INSERT INTO articulos set ?', [newItem]);
    req.flash('success', 'Artículo guardado exitosamente.');
    res.redirect('/articulos');
});

router.get('/', isLoggedIn, async (req, res) => {
    const articulos = await pool.query('SELECT * FROM articulos');
    console.log(articulos);
    res.render('articulos/list', { articulos });
});

router.get('/eliminar/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    await pool.query('DELETE FROM articulos WHERE ID = ?', [id]);
    req.flash('success', 'Artículo eliminado exitosamente.');
    res.redirect('/articulos');
});

router.get('/editar/:id', isLoggedIn, async (req, res) => {
    const {id} = req.params;
    const articulos = await pool.query('SELECT * FROM articulos WHERE id = ?', [id]);
    res.render('articulos/editar', {articulo: articulos[0]});
});

router.post('/editar/:id', isLoggedIn, async (req, res) =>{
    const {id} = req.params;
    const {nombre, grupo, año, idProveedor} = req.body;
    const newArticulo = {
        nombre,
        grupo,
        año,
        idProveedor
    };
    await pool.query('UPDATE articulos SET ? WHERE id = ?', [newArticulo, id]);
    req.flash('success', 'Artículo actualizado exitosamente.');
    res.redirect('/articulos');
});

module.exports = router;