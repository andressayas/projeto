const db = require('../config/db')
const Cargo = require('./Cargo')
const Usuario = require('./Usuario')

const Vaga = db.sequelize.define('vagas', {
    vaga_titulo: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    vaga_descri: {
        type: db.Sequelize.TEXT,
        allowNull: false
    },
    vaga_salario: {
        type: db.Sequelize.DECIMAL(10, 2),
        allowNull: false
    },
    vaga_local: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    cargo_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    },
    cargo_nome: {
        type: db.Sequelize.STRING,
        allowNull: false
    },
    clie_id: {
        type: db.Sequelize.INTEGER,
        allowNull: false
    }
})

Cargo.hasMany(Vaga, {as: 'Vagas', foreignKey: 'cargo_id'})
Vaga.belongsTo(Cargo, {as: 'Cargos', foreignKey: 'cargo_id'})

Usuario.hasMany(Vaga, {as: 'Vagas', foreignKey: 'clie_id'})
Vaga.belongsTo(Usuario, {as: 'Usuarios', foreignKey: 'clie_id'})

//Vaga.sync({force: true})

module.exports = Vaga