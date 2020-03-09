/*const Pool = require('pg').Pool;
const pool = new Pool({
    host: 'localhost',
    database: 'process',
    password: 'admin',
    user : 'postgres',
    port: 5432
});*/
const Sequelize  = require('sequelize');
const sequelize = new Sequelize('process', 'postgres', 'admin', {
    dialect: 'postgres',
    host: 'localhost'
});

sequelize.sync().then(result =>{
    console.log(result);
}).catch(error => console.log(error));
