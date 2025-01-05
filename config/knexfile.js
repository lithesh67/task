const env=require('dotenv').config({path:'../.env'});
// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

    development: {
      client: 'mysql2',
      connection: {
        host:process.env.hostname,
        user: process.env.user,
        password: process.env.password,
        database:process.env.database,
        port: 4406
      },
      migrations:{
        directory: '../database/migrations'
      }
    },
  };