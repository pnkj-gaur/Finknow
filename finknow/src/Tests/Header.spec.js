import Header from '../Components/Header/Header';
import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'
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

describe("Header Test",() => {
    //Test Case:
    it("Header Should Contain Text",() => {
        act(() => {
            render(<BrowserRouter><Header></Header></BrowserRouter>,container);
            
            const title = container.querySelector('a').text;
            
            expect(title).toBe('FinKnow');
        })
    })
})

export default Header;