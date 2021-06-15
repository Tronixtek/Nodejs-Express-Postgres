
exports.up = function(knex) {
    return knex.schema.createTable('users',(table)=>{
        table.increments('id');
        table.string('first_name').notNullable();
        table.string('last_name').notNullable();
        table.string('email').unique().notNullable();
        table.string('gender').notNullable();
        table.string('job_role').notNullable();
        table.string('department').notNullable();
        table.string('address').notNullable();
        table.text('password').notNullable();
    }).createTable('admin',(table)=>{
        table.string('admin_id').notNullable();
        table.string("admin_password").notNullable();
        table.string("email").unique().notNullable();
    }).createTable('articles',(table)=>{
        table.increments('id');
        table.string('title').notNullable();
        table.text('article').notNullable();
        table.boolean("Flagged").notNullable().defaultTo(false);
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('Created_by').references('email').inTable('users');
    }).createTable('gif_upload',(table)=>{
        table.increments('id').references('id').inTable('articles');
        table.string('title').notNullable();
        table.text('url').notNullable();
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.string('Created_by').references('email').inTable('users');
        table.boolean("Flagged").notNullable().defaultTo(false);
    }).createTable('comments',(table)=>{
        table.increments('id');
        table.string('comment').notNullable();
        table.integer('article_id').references('id').inTable('articles');
        table.integer('gif_id').references('id').inTable('gif_upload');
        table.string('created_by').references('email').inTable('users');
        table.timestamp('created_on').defaultTo(knex.fn.now());
        table.boolean("Flagged").notNullable().defaultTo(false);
    })
  
};

exports.down = function(knex) {
   return knex.schema
   .dropTable('comments')
   .dropTable('gif_upload')
   .dropTable('articles')
   .dropTable('admin')  
   .dropTable('users');
};
