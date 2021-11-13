    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    const path = require('path')
    const handlebars = require('express-handlebars')
    const usuario = require('./routes/usuario')
    const bodyParser = require('body-parser')

// Indicando aa pastas a serem usadas

    app.use(express.static(path.join(__dirname, 'public')));

    // Configurando o Handlebars

        app.engine('handlebars', handlebars({defaultLayout: 'main'}))
        app.set('view engine', 'handlebars')

//Body-Parser

    app.use(bodyParser.urlencoded({extended: false}))
    app.use(bodyParser.json())

// Rotas

    app.get('/', (req, res) => {
        res.render('index'); 
    });

    app.get('/sobre', (req, res) => {
        res.render('sobre');
    })

    app.use('/usuarios', usuario)
                    
// Abrindo o server

    server.listen(8081, () => {
        console.log('Servidor rodando 🔄');
    });




 
 
