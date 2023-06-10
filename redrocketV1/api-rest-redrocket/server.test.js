const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('./server'); // Import your Express server

const expect = chai.expect;

chai.use(chaiHttp);

describe('User Registration', () => {
  it('should register a new user', (done) => {
    chai
      .request(server)
      .post('/user/register')
      .send({
        name: 'John',
        surname: 'Doe',
        nick: 'johndoe',
        email: 'johndoe@example.com',
        password: 'password',
        city: 'New York',
        country: 'USA',
        edad: 25,
        estudios: 'Computer Science',
        idiomas: ['English', 'Spanish'],
        linkedin: 'https://www.linkedin.com/in/johndoe',
        hobbies: ['Reading', 'Gaming'],
        conocimiento_extra: 'Some extra knowledge',
        image: 'https://example.com/profile.jpg',
      })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property('message').equal('El usuario ha sido registrado correctamente.');
        done();
      });
  });

  it('should return an error if password is not provided', (done) => {
    chai
      .request(server)
      .post('/user/register')
      .send({
        name: 'John',
        surname: 'Doe',
        nick: 'johndoe',
        email: 'johndoe@example.com',
        city: 'New York',
        country: 'USA',
        edad: 25,
        estudios: 'Computer Science',
        idiomas: ['English', 'Spanish'],
        linkedin: 'https://www.linkedin.com/in/johndoe',
        hobbies: ['Reading', 'Gaming'],
        conocimiento_extra: 'Some extra knowledge',
        image: 'https://example.com/profile.jpg',
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        expect(res.body).to.have.property('message').equal('La contraseña es requerida.');
        done();
      });
  });

  // Add more test cases for different scenarios

});
