const environment = process.env.NODE_ENV || 'development';
const knex = require('knex');
const knexfile = require('../db/knexfile');
const environmentConfig = knexfile[environment] 

const db = knex(environmentConfig)


 
module.exports =db 