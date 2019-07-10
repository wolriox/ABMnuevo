const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth-permisos');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('proveedores/add');
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { idProveedor, nombreProveedor, pDireccion, pTelefono, pContacto } = req.body;
    const newProv = {
        idProveedor,
        nombreProveedor,
        pDireccion,
        pTelefono,
        pContacto
    };
    await pool.query('INSERT INTO proveedores set ?', [newProv]);
    req.flash('success', 'Proveedor guardado exitosamente.');
    res.redirect('/proveedores');
});

router.get('/', isLoggedIn, async (req, res) => {
    const proveedores = await pool.query('SELECT * FROM proveedores');
    console.log(proveedores);
    res.render('proveedores/list', { proveedores });
});

router.get('/eliminar/:idProveedor', isLoggedIn, async (req, res) => {
    const {idProveedor} = req.params;
    await pool.query('DELETE FROM proveedores WHERE idProveedor = ?', [idProveedor]);
    req.flash('success', 'Proveedor eliminado exitosamente.');
    res.redirect('/proveedores');
});

router.get('/editar/:idProveedor', isLoggedIn, async (req, res) => {
    const {idProveedor} = req.params;
    const proveedores = await pool.query('SELECT * FROM proveedores WHERE idProveedor = ?', [idProveedor]);
    res.render('proveedores/editar', {proveedor: proveedores[0]});
});

router.post('/editar/:idProveedor', isLoggedIn, async (req, res) =>{
    const {idProveedor} = req.params;
    const {nombreProveedor, pDireccion, pTelefono, pContacto} = req.body;
    const newProv = {
        nombreProveedor,
        pDireccion,
        pTelefono,
        pContacto
    };
    await pool.query('UPDATE proveedores SET ? WHERE idProveedor = ?', [newProv, idProveedor]);
    req.flash('success', 'Proveedor actualizado exitosamente.');
    res.redirect('/proveedores');
});

module.exports = router;