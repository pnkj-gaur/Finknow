/// <reference types="cypress" />

describe('Getting into App',() => {
    
    const email = 'pankaj@gmail.com'
    const password = '12345678'
    const comment = 'This is a comment for the query.'
    const title = "New Title2"
    const description = "DescriptionDescriptionDescriptionDescriptionDescriptionDescription"
   
    context('Checking different options', () => {
        
        beforeEach(function () {
            cy.visit('http://localhost:3000/',{delay : 10000})
            cy.get('input[name=email]')
                .type(email,{ delay: 100 })
                cy.get('input[name=password]')
                .type(password,{ delay: 100 })
                cy.get('button').contains('Login').click();
               
          })

            it("Traversing in Account",()=>{
            
                cy.get('.dropdown-toggle').contains('Account').click()
                cy.wait(600)
                cy.get('.dropdown-item').contains('Profile').click()
                cy.wait(600)
                cy.get('.profile-links').contains('Asked Query').click()
                cy.wait(600)
                cy.get('.profile-queries').find('h2').should(($h) => {
                    expect($h.first()).to.contain('Asked Query')
                })
                cy.wait(600)
                cy.go('back')
                cy.wait(600)
                cy.get('.profile-links').contains('Solved Query').click()
                cy.wait(600)
                cy.get('.profile-queries').find('h2').should(($h) => {
                    expect($h.first()).to.contain('Solved Query')
                })
                cy.wait(600)
                cy.go('back')
                cy.wait(600)
                cy.go('back')
            })
            
            it("Checking Ask Query",()=>{
            
                cy.wait(600)
                cy.get('.nav-link').contains('Ask Query').click()
                cy.wait(600)
                cy.get('.css-1wa3eu0-placeholder').contains('Select').click()
                cy.wait(600)
                cy.get('.css-1wa3eu0-placeholder').type('investment{enter}')
                cy.wait(600)
                cy.get('label').first().find('b').should(($b) => {
                    expect($b.first()).to.contain('Title')
                })
                cy.get('input[id=floatingInputValue]').first().type(title)
                cy.wait(600)
                cy.get('label').last().find('b').should(($b) => {
                    expect($b.first()).to.contain('Query Description')
                })
                cy.get('input[id=floatingInputValue]').last().type(description)
                cy.wait(600)
                cy.contains('Submit').click()

                //Successful submission of query
                cy.on('window:alert', (str) => {
                    expect(str).to.equal(`Query Added Successfully`)
                  })     
            })
            
            it("Checking Dashboard Cards",()=> {

                cy.wait(600)
                cy.get('.get-btn').contains('Open').click()
                cy.wait(600)
                cy.get('.sol-card').find('button').first().click()
                cy.wait(600)
                cy.get('.sol-card').find('button').last().click({force:true})
                cy.wait(600)
                cy.get('.trial').first().find('h4').should(($h) => {
                expect($h.first()).to.contain('Discussion')})
                cy.wait(600)
                cy.get('input[name=cmt]').type(comment)
                cy.wait(600)   
                cy.contains('Post').click()
                
                // Successful submission of comment
                cy.on('document:alert', (str) => {
                    expect(str).to.equal(`done`)
                }) 
                
            })     
            
            it('Logging out successfully',()=> {

                cy.wait(1000)
                cy.get('.dropdown-toggle').contains('Account').click()
                cy.wait(1000)
                cy.get('.dropdown-item').contains('Log Out').click()
                cy.wait(1000)
            })
    })       
})

