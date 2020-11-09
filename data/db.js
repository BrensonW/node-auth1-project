const knex = require('knex')
const enviroment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]

module.exports = knex(config);