/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('users');
    if(!exists){
        return knex.schema.table('users',(table)=>{
            table.increments('id').primary();
            table.string('username').notNullable().unique();
            table.string('password').notNullable();                                 
            table.string('email').notNullable().unique();
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('users');
};
