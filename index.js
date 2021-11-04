    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    const path = require('path')
    const usuario = require('./routes/usuario')

// Indicando aa pastas a serem usadas

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'public', 'pages'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

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




 
 
