
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up =async function(knex) {
    const exists=await knex.schema.hasTable('courses');
    if(!exists){
        return knex.schema.table('courses',(table)=>{
          table.incremeents('course_id').primary();
          table.integer('users_id').notNullable().references('id').inTable('users');
          table.string('course_name',200).notNullable();
          table.string('instructor',150).notNullable();
          table.string('description').notNullable();
          table.date('published_date').nullable();
          table.string('duration').notNullable();
        });
    }
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('courses');
};
