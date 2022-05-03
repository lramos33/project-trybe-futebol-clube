import * as sinon from 'sinon';
import * as chai from 'chai';
import chaiHttp = require('chai-http');

import { app } from '../app';
import { UsersMock } from './mocks/user';
import { Response } from 'superagent';
import { before, after } from 'mocha'

import MatchesModel from '../database/models/Matches';
import TeamsModel from '../database/models/Teams';
import UsersModel from '../database/models/Users';

chai.use(chaiHttp);

const { expect } = chai;

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGFkbWluLmNvbSIsInBhc3N3b3JkIjoic2VjcmV0X2FkbWluIiwiaWF0IjoxNjUxNTg3MDgxLCJleHAiOjE2NTIxOTE4ODF9.GZZi8NBKR_4XFpzsiYmjkPz2Dr0vmp6P2YhtltwK_uI';

describe('Testing /login route', () => {

  describe('Testing / endpoint', () => {
    describe('In case of success', () => {
      before(async () => {
        sinon
          .stub(UsersModel, "findOne")
          .resolves(UsersMock as UsersModel);
      });
    
      after(()=>{
        (UsersModel.findOne as sinon.SinonStub).restore();
      });
    
      it('Approved login', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'secret_admin' });
        expect(response.body.user).to.be.deep.equal({ id: 1, username: 'Admin', role: 'admin', email: 'admin@admin.com' });
      });
    });
  
    describe('In case of error', () => {
      before(async () => {
        sinon
          .stub(UsersModel, "findOne")
          .resolves(UsersMock as UsersModel);
      });
    
      after(()=>{
        (UsersModel.findOne as sinon.SinonStub).restore();
      });
  
      it('Missing email', async () => {
        const response = await chai.request(app).post('/login').send({ email: '', password: 'secret_admin' });
        expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
      });
  
      it('Wrong email format', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'admin@admin', password: 'secret_admin' });
        expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
      });
  
      it('Missing password', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '' });
        expect(response.body).to.be.deep.equal({ message: "All fields must be filled" });
      });
  
      it('Wrong password format', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: '123456' });
        expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
      });
  
      it('Wrong password', async () => {
        const response = await chai.request(app).post('/login').send({ email: 'admin@admin.com', password: 'wrong_password' });
        expect(response.body).to.be.deep.equal({ message: "Incorrect email or password" });
      });
    });
  });

  describe('Testing /validate endpoint', () => {
    describe('In case of success', () => {
      it('Valid token', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', TOKEN);
        expect(response.body).to.be.equal('admin');
      });
    });

    describe('In case of error', () => {
      it('Without token', async () => {
        const response = await chai.request(app).get('/login/validate')
        expect(response.body).to.be.deep.equal({ message: "Token not found" });
      });

      it('Wrong token', async () => {
        const response = await chai.request(app).get('/login/validate').set('authorization', 'T0K3N');
        expect(response.body).to.be.deep.equal({ message: "Token not found" });
      });
    });
  });
});
