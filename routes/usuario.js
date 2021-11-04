const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')
const sequelize = require('sequelize')

router.get('/cadastro', (req, res) => {
    res.render('usuarios/cadastro')
})

module.exports = router