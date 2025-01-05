/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
   const exists=await knex.schema.hasTable('files');
   if(!exists){
        return  knex.schema.table('files',(table)=>{
            table.increments('file_id').primary();
            table.integer('courses_id').notNullable().references('course_id').inTable('courses');
            table.string('file_path').notNullable().unique();
            table.string('file_name').notNullable();
            table.enum('file_type',['image','video','doc']).notNullable();
        });
   }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('files');
};
