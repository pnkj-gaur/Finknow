import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'
import Comments from '../Components/Comments/Comments';


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

describe("Comment Test",() => {
    //Test Case:

    it("Comment should contain Post Button",() => {
        act(() => {
            render(<Comments></Comments>,container);
            
            const title = container.querySelector('button').innerHTML;
            
            expect(title).toBe('Post');
        })
    })
})

export default Comments;
