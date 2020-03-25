const knex = require('knex');
const configuration = require('../../knexfile');

//Escolho qual conexao configurada no knexfile eu vou usar
const connection = knex(configuration.development);

module.exports = connection;