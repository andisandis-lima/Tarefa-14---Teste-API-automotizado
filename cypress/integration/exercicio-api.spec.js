/// <reference types="cypress" />
import usuarios from '../contracts/usuarios.contract'
import { faker } from '@faker-js/faker';

describe('Testes da Funcionalidade Usuários', () => {
     let token
     before(() => {
          cy.token('fulano@qa.com', 'teste').then(tkn => { token = tkn })
     });

     it('Deve validar contrato de usuários', () => {
          //TODO: 
          cy.request('usuarios').then(response => {
               expect(response.duration).to.be.lessThan(100)
               return usuarios.validateAsync(response.body)
          })
     });

     it('Deve listar usuários cadastrados', () => {
          //TODO: 
          cy.request({
               method: 'GET',
               url: 'usuarios'
          }).then((response) => {

               expect(response.status).to.equal(200)
               expect(response.body).to.have.property('usuarios')
               expect(response.duration).to.be.lessThan(100)
          })
     });

     it('Deve cadastrar um usuário com sucesso', () => {
          //TODO: 
          let name = faker.name.fullName()
          let email = faker.internet.email()
          cy.request({
               method: 'POST',
               url: 'usuarios',
               body: {
                    "nome": name,
                    "email": email,
                    "password": "teste",
                    "administrador": "true"
               },
               headers: { authorization: token }
          }).then((response) => {
               expect(response.status).to.equal(201)
               expect(response.body.message).to.equal('Cadastro realizado com sucesso')
               expect(response.duration).to.be.lessThan(100)
          })
     });

     it('Deve validar um usuário com email inválido', () => {

          cy.cadastrarUsuario(token, 'Anderson', "Roaldo_Wolf86@yahoo.com", "teste", "true")
               .then((response) => {
                    expect(response.status).to.equal(400)
                    expect(response.body.message).to.equal('Este email já está sendo usado')
                    expect(response.duration).to.be.lessThan(100)
               })
     });

     it('Deve editar um usuário previamente cadastrado', () => {
          let nome = faker.name.fullName()
          let email = faker.internet.email()
          cy.cadastrarUsuario(token, nome, email, "teste", "true")
               .then(response => {
                    let id = response.body._id

                    cy.request({
                         method: 'PUT',
                         url: `usuarios/${id}`,
                         headers: { authorization: token },
                         body:
                         {
                              "nome": nome,
                              "email": email,
                              "password": "teste",
                              "administrador": "true"
                         }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro alterado com sucesso')
                         expect(response.duration).to.be.lessThan(100)
                    })
               })
     });

     it('Deve deletar um usuário previamente cadastrado', () => {

          let nome = faker.name.fullName()
          let email = faker.internet.email()

          cy.cadastrarUsuario(token, nome, email, "teste", "true")
               .then(response => {
                    let id = response.body._id
                    cy.request({
                         method: 'DELETE',
                         url: `usuarios/${id}`,
                         headers: { authorization: token }
                    }).then(response => {
                         expect(response.body.message).to.equal('Registro excluído com sucesso')
                         expect(response.status).to.equal(200)
                         expect(response.duration).to.be.lessThan(100)
                    })
               })
     });

})