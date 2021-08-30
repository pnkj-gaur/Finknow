import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'
import Forgot from '../Components/ForgotPassword/ForgotPass';



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


describe("Forgot Password Test",() => {
    //Test Case:

    it("Forgot Password Should Contain Name Field",() => {
        act(() => {
            render(<Forgot></Forgot>,container);
            
            const title = container.querySelector('label[for=floatingInputValue]').innerHTML;
            
            expect(title).toBe('<b>Name</b>');
        })
    })

    
it("Forgot Password Should Contain Submit button",() => {
        act(() => {
            render(<Forgot></Forgot>,container);
            
            const title = container.querySelector('button').innerHTML;
            
            expect(title).toBe('Submit');
        })
    })
})

export default Forgot;