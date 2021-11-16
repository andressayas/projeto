const db = require('../config/db')

const Cargo = db.sequelize.define('cargos', {
    id: {
        type: db.Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    },
    cargo: {
        type: db.Sequelize.STRING,
        allowNull: false
    }
})

//Cargo.sync({force: true})
/*

Cargo.create({
    id: 1,
    cargo: 'Usuario'
})

Cargo.create({
    id: 2,
    cargo: 'Ajudante de obras'
})
Cargo.create({
    id: 3,
    cargo: 'Babá'
})
Cargo.create({
    id: 4,
    cargo: 'Eletricista' 
})
Cargo.create({
    id: 5,
    cargo: 'Agente administrativo'
})
Cargo.create({
    id: 6,
    cargo: 'Caçambeiro'
})
Cargo.create({
    id: 7,
    cargo: 'Balconista'
})
Cargo.create({
    id: 8,
    cargo: 'Técnico enfermagem'
})
Cargo.create({
    id: 9,
    cargo: 'Promotor de vendas' 
})
Cargo.create({
    id: 10,
    cargo: 'Analista de desenvolvimento de sistemas'
})
Cargo.create({
    id: 11,
    cargo: 'Gerente administrativo' 
})
Cargo.create({
    id: 12,
    cargo: 'Arrumadeira de hotel' 
})
Cargo.create({
    id: 13,
    cargo: 'Vendedor'
})

Cargo.create({
    id: 14,
    cargo: 'Ajudante de boiadeiro'
})
Cargo.create({
    id: 15,
    cargo: 'Auxiliar de limpeza'
})
Cargo.create({
    id: 16,
    cargo: 'Outro'
})

*/

module.exports = Cargo