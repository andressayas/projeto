    const express    = require('express');
    const app        = express();
    const server     = require('http').createServer(app);
    const path       = require('path')
    const handlebars = require('express-handlebars')
    const usuario    = require('./routes/usuario')
    const bodyParser = require('body-parser')
    const session    = require('express-session')
    const flash      = require('connect-flash')
    const passport   = require('passport')
    require('./config/auth')(passport)

// Config

    // Sessão

    app.use(session({
        secret: 'emprega_mais_key_2021',
        resave: true,
        saveUninitialized: true
    }))
    app.use(passport.initialize())
    app.use(passport.session())
    app.use(flash())

// Middleware

    app.use((req, res, next) => {
        res.locals.success_msg = req.flash('success_msg')
        res.locals.error_msg = req.flash('error_msg')
        res.locals.error = req.flash('error')
        res.locals.user = req.user || null
        next()
    })

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




 
 
