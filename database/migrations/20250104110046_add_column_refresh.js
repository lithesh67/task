/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('users');
   if(exists){
        return knex.schema.table('users',(table)=>{
            table.string('Refresh_token');
        });
   }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.table('users',(table)=>{
        table.dropColumn('Refresh_token');
   });
};
