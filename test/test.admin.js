require("dotenv").config();
/* eslint-disable no-undef */
const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");
const {users} = require("../db/mock/mock");



const api = process.env.api
//assertion style
chai.should();
chai.use(chaiHttp)


describe("User Authentication",()=>{
    it("should return http status of 400",(done)=>{
        const data ={
            email:users[3].email,
            password:users[3].password
        };
        chai.request(app)
        .post(`${api}/auth/admin/signin`)
        .send(data)
        .end((err,response)=>{
            response.body.should.have.property('status')
                .equal(400);
            response.body.should.have.property('message')
                .equal('Invalid Username or Password')
        })
        done()

    })
    it("should return 422 http status",(done)=>{
        const data = {};
        chai.request(app)
        .post(`${api}/auth/admin/signin`)
        .send(data)
        .end((err,response)=>{
            response.body.should.have.property('status')
            .equal(422);
        })
        done()

    });
    it('should return 200 http status',(done)=>{
        const data = {
            email:users[3].email,
            password:users[3].admin_password
        };
        chai.request(app)
        .post(`${api}/auth/admin/signin`)
        .send(data)
        .end((err,response)=>{
            response.body.should.have.property('message')
                .equal('logging in');
           // response.body.should.have.property('token')
           //     .equal(token);
            response.body.should.be.an('Object');
        })
        done();
    });  
});