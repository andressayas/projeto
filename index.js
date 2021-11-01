const express = require('express');
const app = express();
const server = require('http').createServer(app);
const path = require('path')

// indicando aa pastas a serem usadas
    app.use(express.static(path.join(__dirname,'public')));
    app.set('views', path.join(__dirname, 'public'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

// Rotas

    app.use('/', (req, res) => {
        res.render('pages/index.html');
    });

    
// Abrindo o server
    server.listen(8081, () => {
        console.log('Servidor rodando 🔄');
    });
