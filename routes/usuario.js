const express  = require('express')
const router   = express.Router()
const Usuario  = require('../models/Usuario')  
const Cargo    = require('../models/Cargo')  
const passport = require('passport')
const { Op }   = require('sequelize')

router.get('/cadastro', (req, res) => {
    res.render('usuarios/cadastro')
})

/** Routa post para cadastrar um usuário, com:
 *  - Verificação de campos
 *  - Adição de dados na tabela do Banco de Dados
 */

router.post('/cadastro', (req, res) => {

    var erros = []

    if(!req.body.nome || typeof req.body.nome == undefined || req.body.nome == null) {
        erros.push({texto: 'Nome inválido'});
    }

    if(!req.body.email || typeof req.body.email == undefined || req.body.email == null) {
        erros.push({texto: 'E-mail inválido'});
    }

    if(!req.body.senha || typeof req.body.senha == undefined || req.body.senha == null) {
        erros.push({texto: 'Senha inválido'});
    }

    if(req.body.senha.lenght < 6) {
        erros.push({texto: 'Senha muito curta, deve ser maior ou igual a 6 dígitos'});
    }

    if(req.body.senha != req.body.senha2) {
        erros.push({texto: 'As senhas estão diferentes!'});
    }

    if(erros.length > 0){
        res.render('usuarios/cadastro', {erros: erros})
    } else {
        Usuario.findOne({where: {email: req.body.email}}).then((usuario) => {
            if(usuario){
                res.redirect('/usuarios/cadastro')
            } else {
                /* Criação do usuario */
                Usuario.create({
                    nome: req.body.nome,
                    email: req.body.email, 
                    senha: req.body.senha, 
                    localizacao: req.body.localizacao,
                    telefone: req.body.telefone,
                    data_nasc: req.body.data_nasc
                }).then(() => { //Faça isso caso dê certo
                    res.redirect('/')
                }).catch((erro) => { //Faça isso caso dê errado
                    req.flash('error_msg', "Houve um erro no processo de cadastro")
                    res.send('Erro no cadastro: ' + erro)
                })
            }
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro interno')
            res.send('Erro interno: ' + erro)
        })
    }
    
})

router.get('/login', (req, res) => {
    res.render('usuarios/login')
})

router.post('/login', passport.authenticate('local', {
    successRedirect: '/',
    successFlash: true,
    failureRedirect: '/usuario/login',
    failureFlash: true
}), (req, res) => {
    req.flash('error_msg', 'Houve um erro ao efetuar o processo de login')
    res.redirect('/')
})

router.get('/cadastro/cargo', (req, res) => {
    Usuario.findOne({where: {id: req.user.id}}).then((usuario) => {
        Cargo.findAll({where: {id: {[Op.ne]: 1}}}).then((cargos) => {
            res.render('usuarios/cadastro_cargo', {usuario: usuario, cargos: cargos})
        }).catch((erro) => {
            req.flash('error_msg', 'Houve um erro ao carregar os cargos, tente novamente mais tarde...')
            res.redirect('/')
        })
    }).catch((erro) => {
        req.flash('error_msg', 'Houve um erro ao carregar suas informações, tente novamente mais tarde...')
        res.redirect('/')
    })
})

router.post('/cadastro/cargo', (req, res) => {
    Usuario.findOne({where: {id: req.body.id}}).then((usuarios) => { 
        usuarios.update({papel: req.body.cargo}, {where: {cargo: 1}}).then(() => {
            req.flash('success_msg', 'Cadastro feito com sucesso! Agora você é um usuário com um cargo cadastrado no site! Agora pessoas podem lhe contratar, que legal!')
            res.redirect('/')
        }).catch((err) => {
            console.log(err)
            req.flash('error_msg', 'Erro interno')
            res.redirect('/')
        })
    }).catch((err) => {
        console.log(err)
        req.flash('error_msg', 'Houve um erro ao salvar o seu cadastro com o cargo escolhido, tente novamente mais tarde...')
        res.redirect('/')
    })  
})

module.exports = router
