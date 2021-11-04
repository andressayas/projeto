const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')
const sequelize = require('sequelize')

router.get('/cadastro', (req, res) => {
    res.render('usuarios/cadastro')
})

router.post('/cadastro/add', (req, res) => {
    Usuario.create({
        nome: req.body.nome,
        email: req.body.email, 
        senha: req.body.senha, 
        localizacao: req.body.localizacao,
        telefone: req.body.telefone,
        data_nasc: req.body.data_nasc
    }).then(() => { //Faça isso caso dê certo
        res.redirect('/')
    }).catch((err) => { //Faça isso caso dê errado
        res.send('Erro no cadastro: ' + err)
    })
})

module.exports = router
