const express = require('express')
const router = express.Router()
const Usuario = require('../models/Usuario')    

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

    console.log(erros)

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
                    res.send('Erro no cadastro: ' + erro)
                })
            }
        }).catch((erro) => {
            res.send('Erro interno: ' + erro)
        })
    }
    
})

module.exports = router
