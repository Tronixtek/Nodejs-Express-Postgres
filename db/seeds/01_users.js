const bcrypt = require("bcrypt")

exports.seed =  async function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(async function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          first_name:"Shelby",
          last_name:"thomas",
          email:"francisv@gmail.com",
          gender:"female",
          job_role:"director",
          department:"design",
          address:"beniee",
          password:await bcrypt.hash("5555555",10)
      },
      {
        first_name:"Shelby",
        last_name:"thomas",
        email:"frankv@gmail.com",
        gender:"female",
        job_role:"director",
        department:"design",
        address:"beniee",
        password:await bcrypt.hash("5345675",10)
    },
    {
      first_name:"Shelby",
      last_name:"thomas",
      email:"anssv@gmail.com",
      gender:"female",
      job_role:"director",
      department:"design",
      address:"beniee",
      password:await bcrypt.hash("5555555",10)
  },{
    first_name:"Shelby",
    last_name:"thomas",
    email:"fisv@gmail.com",
    gender:"female",
    job_role:"director",
    department:"design",
    address:"beniee",
    password:await bcrypt.hash("5555555",10)
},    {
  first_name:"Shelby",
  last_name:"thomas",
  email:"basil@gmail.com",
  gender:"female",
  job_role:"director",
  department:"design",
  address:"beniee",
  password:await bcrypt.hash("555555",10)
},
{
  first_name:"Shelby",
  last_name:"thomas",
  email:"krx@gmail.com",
  gender:"female",
  job_role:"director",
  department:"design",
  address:"beniee",
  password:await bcrypt.hash("5555555",10)
}
      ]);
    });
};
