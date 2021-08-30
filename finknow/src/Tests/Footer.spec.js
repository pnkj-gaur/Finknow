import Footer from '../Components/Footer/Footer';
import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'

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

describe("Footer Test",() => {
    //Test Case:
    it("Footer Should Contain Text",() => {
        act(() => {
            render(<Footer></Footer>,container);
           
            const title = container.querySelector('p').innerHTML;
            console.log(title);
            expect(title).toBe('All rights reserved by: <b><font color=\"#009933\">F</font></b>in<b><font color=\"silver\">K</font></b>now');
        })
    })
})

export default Footer;