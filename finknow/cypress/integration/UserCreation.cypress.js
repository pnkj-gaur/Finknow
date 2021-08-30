/// <reference types="cypress" />

describe('Getting into App',() => {
    
    const email = 'aman3@gmail.com'
    const password = 'password3'
    const name = "aman3"
    const confirm = 'password3'
    
    const email_wrong = 'email@email.com'
    const password_wrong = 'incorrect'

    beforeEach(function () {
        cy.visit('http://localhost:3000/')
      })

    context('Checking navigation', () => {

        
        it("Header Contains Buttons",()=>{
    
            cy.get('.navbar-brand').contains('FinKnow').click()
            cy.wait(100)
            cy.get('.nav-link').contains('Home').click()
            cy.wait(100)
            cy.get('.nav-link').contains('About').click()
            cy.wait(100)
            cy.get('.nav-link').contains('Sign Up').click()
            cy.wait(100)
            cy.get('.nav-link').contains('Login').click()
            cy.wait(100)
            
        })
    
    })

    context('Signing Up in App', () => {

        it("Should be on same page for Invalid entries",()=>{
    
            cy.get('.nav-link').contains('Sign Up').click()
            cy.get('input[name=name]')
            .type(" ",{ delay: 100 })
            cy.get('input[name=email]')
            .type(email,{ delay: 100 })
            cy.get('input[name=password]')
            .type(password,{ delay: 100 })
            cy.get('input[name=confirm]')
            .type(confirm,{ delay: 100 })
            cy.get('button').contains('Sign Up').click();

            cy.on('window:alert', (str) => {
                
                expect(str.substring(0,11)).to.equal(`enter valid`)
              })              
            
        })

        
        it("Should be Signed Up after successful submission",()=>{
    
            cy.get('.nav-link').contains('Sign Up').click()
            cy.get('input[name=name]')
            .type(name,{ delay: 100 })
            cy.get('input[name=email]')
            .type(email,{ delay: 100 })
            cy.get('input[name=password]')
            .type(password,{ delay: 100 })
            cy.get('input[name=confirm]')
            .type(confirm,{ delay: 100 })
            cy.get('button').contains('Sign Up').click();
        })

        cy.on('window:alert', (str) => {
            str.substring(0,17)
            expect(str).to.equal(`Saved Succesfully`)
          })   
    
    })

    context('Logging In App', () => {
        
        

        it('Should be on same page for Invalid Credentials', function () {
            // incorrect username on purpose
            cy.get('.nav-link').contains('Login').click()
            cy.get('input[name=email]').type(email_wrong,{ delay: 100 })
            cy.get('input[name=password]').type(password_wrong,{ delay: 100 })
            cy.get('button').contains('Login').click();
            //should be on the same URL
            cy.url().should('include', '/LogIn')
            
        })    

        it("Should be Logged In after successful submission",()=>{
    
            cy.get('.nav-link').contains('Login').click()
            cy.get('input[name=email]')
            .type(email,{ delay: 100 })
            cy.get('input[name=password]')
            .type(password,{ delay: 100 })
            cy.get('button').contains('Login').click();
            //should redirect to localhost:3000/Home
            cy.url().should('include', '/Home')
        })

    })
    
})


