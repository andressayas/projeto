    const express = require('express');
    const app = express();
    const server = require('http').createServer(app);
    const path = require('path')

// Indicando aa pastas a serem usadas

    app.use(express.static(path.join(__dirname, 'public')));
    app.set('views', path.join(__dirname, 'public'));
    app.engine('html', require('ejs').renderFile);
    app.set('view engine', 'html');

// Rotas

    app.get('/', (req, res) => {
        res.render('pages/index'); 
    });

    app.get('/sobre', (req, res) => {
        res.render('pages/sobre');
    })
                    
// Abrindo o server

    server.listen(8081, () => {
        console.log('Servidor rodando 🔄');
    });




 
 
