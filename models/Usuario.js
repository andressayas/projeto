/* Arquivo para criação do Model Usuario */

const db = require('../config/db')

const Usuario = db.sequelize.define('usuarios', {
    nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    senha: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    curriculo: {
        type: db.Sequelize.STRING,
        allowNull: true
    },
    localizacao: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    telefone: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    data_nasc: {
        type: db.Sequelize.DATEONLY,
        allowNull: false
    },
    papel: {
        type: db.Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}) 

// Usuario.sync({force: true})

module.exports = Usuario

