require("dotenv").config();
/* eslint-disable no-undef */
const chai = require("chai");
const app = require("../app");
const chaiHttp = require("chai-http");

const api = process.env.api
//assertion style
chai.should();
chai.use(chaiHttp)

// eslint-disable-next-line no-undef
describe("Andela API",()=>{
    //testing  get all article
    describe("Get all articles",()=>{
        it("should get all article",(done)=>{
            chai.request(app)
            .get(`${api}/feeds`)
            .end((err,response)=>{
                response.should.be.a('Object')
                response.should.have.status(200);
            })
            done()
        })
    })
    //testing get article by Id
    //testing post article
    //testing update article
    //testing delete article
    //testing flag article as inappropriate
    

    
})