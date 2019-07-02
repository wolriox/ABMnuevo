const express = require('express');
const router = express.Router();

const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth-permisos');

router.get('/registrarse', (req, res) => {
    res.render('auth/registrarse');
});

router.post('/registrarse', passport.authenticate('local.registrarse', {
    successRedirect: '/',
    failureRedirect: '/registrarse',
    failureFlash: true
}));

router.get('/ingresar', isNotLoggedIn, (req, res) => {
    res.render('auth/ingresar');
});

router.post('/ingresar', isNotLoggedIn, (req, res, next) => {

    passport.authenticate('local.ingresar', {
        successRedirect: '/',
        failureRedirect: '/ingresar',
        failureFlash: true
    })(req, res, next);
});

router.get('/salir', isLoggedIn, (req, res) => {
    req.logOut();
    res.redirect('/ingresar');
});



module.exports = router;

