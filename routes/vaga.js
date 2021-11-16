const express  = require('express')
const router   = express.Router()
const Vaga     = require('../models/Vaga')
const Cargo    = require('../models/Cargo')
const Usuario  = require('../models/Usuario')
const { Op }   = require('sequelize')

router.get('/home', (req, res) => {
    Vaga.findAll().then((vagas) => {
        res.render('vagas/resultado', {vagas: vagas})
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao carregar a página das vagas...')
        res.redirect('/')
    })
})

router.get('/resultado/:id', (req, res) => {
    Vaga.findOne({
        where: {id: req.params.id
    }, include: [{model: Usuario, as: 'Usuarios'}]}).then((vaga) => {
        if (req.user.id == vaga.clie_id) {
            res.render('vagas/vaga', {vaga: vaga, user: req.user})
        } else {
            res.render('vagas/vaga', {vaga: vaga})
        }
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao carregar a página da vaga...')
        res.redirect('/vagas')
    })
})

router.get('/criar-vaga', (req, res) => {
    Cargo.findAll({
        where: {id: {[Op.ne]: 1}}
    }).then((cargos) => {
        res.render('vagas/criar_vaga', {cargos: cargos, user: req.user})
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao carregar a página de criação de vaga...')
        res.redirect('/')
    })
})

router.post('/criar-vaga', (req, res) => {
    Cargo.findOne({
        where: {id: req.body.cargo}
    }).then((cargo) => {
        Vaga.create({
            vaga_titulo: req.body.titulo,
            vaga_descri: req.body.descricao,
            vaga_salario: req.body.salario,
            vaga_local: req.body.localizacao,
            cargo_nome: cargo.cargo,
            cargo_id: req.body.cargo,
            clie_id: req.body.id
        }).then((vaga) => {
            req.flash('success_msg', 'Vaga criada com sucesso!')
            res.redirect('/vagas/resultado/' + vaga.id)
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao salvar a vaga...')
            res.redirect('/')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao salvar a vaga de acordo com o cargo escolhido...')
        res.redirect('/')
    })
})

router.get('/excluir/:vaga_id', (req, res) => {
    Vaga.destroy({
        where: {id: req.params.vaga_id}
    }).then(() => {
        req.flash('success_msg', 'Vaga exluída com sucesso!')
        // MUDA AGORINHA --> res.render()
        res.redirect('/')
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao exluir a vaga...')
        res.redirect('/')
    })
})

router.post('/pesquisar-vagas', (req, res) => {
    Vaga.findAll({
        where: {cargo_nome: {[Op.like]: '%' + req.body.campo + '%'}}
    }).then((vagas) => {
        res.render('vagas/resultado', {vagas: vagas, parametro: req.body.campo})
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao procurar as vagas a cerca do parâmetro informado...')
        res.redirect('/')
    })
})
    

module.exports = router