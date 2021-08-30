import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'
import SignUp from '../Components/SignUp/SignUp';
import { BrowserRouter } from 'react-router-dom';

//dom
let container = null;
// please add your test cases here

beforeEach(() => {
container=document.createElement('div');
document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container=null;
})

describe("SignUp Test",() => {
    //Test Case:
    it("SignUp Should Contain Email Field",() => {
        act(() => {
            render(<BrowserRouter><SignUp></SignUp></BrowserRouter>,container);
           
            const title = container.querySelector('label[for=email]').innerHTML;
            
            expect(title).toBe('<b>Email</b>');
        })
    })


    it("SignUp Should Contain Button",() => {
        act(() => {
            render(<BrowserRouter><SignUp></SignUp></BrowserRouter>,container);
           
            const title = container.querySelector('button').innerHTML;
           
            expect(title).toBe('Sign Up');
        })
    })

    it("SignUp Should Contain Link",() => {
        act(() => {
            render(<BrowserRouter><SignUp></SignUp></BrowserRouter>,container);
           
            const title = container.querySelector('a').innerHTML;
           
            expect(title).toBe('Already have an account? Log In');
        })
    })


})

export default SignUp;