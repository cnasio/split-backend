const Chai = require('chai')
const ChaiHTTP = require('chai-http')
const { response } = require('express')
const { describe, it: test } = require('mocha') 

const app = require('../app')

Chai.should()
Chai.use(ChaiHTTP)

const randomString = Math.random().toString(36).substring(7)
const user = {
  name: randomString,
  email: randomString,
  password: randomString
}

const testingNonExistentRoute = () => {
  describe('Testing a route that does not exist', () => {
    test('Expecting 404 not found', done => {
        Chai.request(app)
        .get(`/${randomString}`)
        .end((request, response) => {
          response.should.have.a.status(404)
          done()
        })
    })
  })
}

const createUser = () => {
  describe('Testing CREATE(POST) method for user', () => {
    test('Expecting a user to be created', done => {
      Chai.request(app)
      .post('/api/users/signup')
      .send(user)
      .end((error, response) => {
        response.should.have.a.status(201)
        response.body.users.should.be.a('object')
        response.body.users.should.have.property('name').eq(user.name)
        response.body.users.should.have.property('email').eq(user.email)
        response.body.users.should.have.property('password').eq(user.password)
        done()
      })
    })
  })
}


const getUsers = () => {
  describe('Testing GET method for all users', () => {
    test('Expecting to return all users', done => {
      Chai.request(app)
          .get('/api/users')
          .end((error, response) => {
            //console.log(response.body.users)
            response.should.have.a.status(200)
            response.body.users.should.be.a('array')
            response.body.users.length.should.be.eq(3)
        done()
      })
    })
  })
}

describe('TESTING THE USER API ROUTE', () => {
  //testingNonExistentRoute()
  //createUser()
  getUsers()
})
