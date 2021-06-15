const bcrypt = require("bcrypt")

exports.seed =  async function(knex) {
  // Deletes ALL existing entries
  return knex('admin').del()
    .then(async function () {
      // Inserts seed entries
      return knex('admin').insert([
        { admin_id: 'admin_01',admin_password:await bcrypt.hash('123456',10),email:"admin01@gmail.com"},
        { admin_id: 'admin_02',admin_password:await bcrypt.hash('987654',10),email:"admin02@gmail.com"},
   
      ]);
    });
};
