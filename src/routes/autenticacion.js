const express = require('express');
const router = express.Router();

const passport = require('passport');

router.get('/registrarse', (req, res) => {
    res.render('auth/registrarse');
});

router.post('/registrarse', passport.authenticate('local.registrarse', {
    successRedirect: '/',
    failureRedirect: '/registrarse',
    failureFlash: true
}));

router.get('/ingresar', (req, res) => {
    res.render('auth/ingresar');
});

router.post('/ingresar', (req, res, next) => {

    passport.authenticate('local.ingresar', {
        successRedirect: '/',
        failureRedirect: '/ingresar',
        failureFlash: true
    })(req, res, next);
});



module.exports = router;

