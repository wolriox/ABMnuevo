const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('./helpers');

passport.use('local.ingresar', new LocalStrategy({
  usernameField: 'idUsuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, idUsuario, password, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
  if (rows.length > 0) {
    const user = rows[0];
    const validPassword = await helpers.matchPassword(password, user.password)
    if (validPassword) {
      done(null, user, req.flash('success', 'Binvenido.'));
    } else {
      done(null, false, req.flash('message', 'Contraseña incorrecta.'));
    }
  } else {
    return done(null, false, req.flash('message', 'Usuario inexistente.'));
  }
}));

passport.use('local.registrarse', new LocalStrategy({
  usernameField: 'idUsuario',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, idUsuario, password, done) => {

  const { nombreUsuario } = req.body;
  let newUser = {
    nombreUsuario,
    idUsuario,
    password
  };
  newUser.password = await helpers.encryptPassword(password);
  // Saving in the Database
  const result = await pool.query('INSERT INTO usuarios SET ? ', newUser);
  //newUser.idUsuario = result.insertId;
  return done(null, newUser);
}));

passport.serializeUser((user, done) => {
  done(null, user.idUsuario);
});

passport.deserializeUser(async (idUsuario, done) => {
  const rows = await pool.query('SELECT * FROM usuarios WHERE idUsuario = ?', [idUsuario]);
  done(null, rows[0]);
});