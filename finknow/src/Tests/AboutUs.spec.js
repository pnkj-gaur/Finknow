// connect - store issue in test

import {render,unmountComponentAtNode} from 'react-dom';
import {act} from 'react-dom/test-utils';
import React from 'react'
import AboutUs from '../Components/AboutUs/AboutUs';
import store from '../store';
import {Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import {logedin,logedout,setUser,delUser} from '../ReduxAction/Action'
import {connect} from 'react-redux';
import configureStore from 'redux-mock-store'

// const initialState = {auth:true}; 
// const mockStore = configureStore();
// const mapDispatchToProps=(dispatch)=>{
//   return {
//     logedin:()=>dispatch(logedin()),
//     logedout:()=>dispatch(logedout()),
//     setUser:(user)=>dispatch(setUser(user)),
//     delUser:()=>dispatch(delUser()),
//   }
// }

// const mapStateToProps=(props)=>{
//     return {
//       log:props.isvalid,
//       username:props.username
//     }
//   }

store.subscribe(()=>console.log(store.getState()));
//dom
let container = null;
// please add your test cases here
// store = mockStore(initialState);
beforeEach(() => {
 
container=document.createElement('div');
document.body.appendChild(container);
})

afterEach(() => {
    unmountComponentAtNode(container);
    container.remove();
    container=null;
})

describe("About Us Test",() => {
    //Test Case:
    it("AboutUs Should Contain About Us",() => {
        act(() => {
            render(<BrowserRouter><Provider  store={store}><AboutUs log={true}></AboutUs></Provider></BrowserRouter>,container);
            
            const title = container.querySelector('.aboutus-title').innerHTML;
            console.log(title);
            expect(title).toBe('About Us');
        })
    })

    it("AboutUs Should Contain Contact",() => {
        act(() => {
            render(<BrowserRouter><Provider  store={store}><AboutUs log={true}></AboutUs></Provider></BrowserRouter>,container);
            
            const title = container.querySelector('.aboutus-more').innerHTML;
            console.log(title);
            expect(title).toBe('Contact Us');
        })
    })

    it("AboutUs Should Contain Features",() => {
        act(() => {
            render(<BrowserRouter><Provider  store={store}><AboutUs log={true}></AboutUs></Provider></BrowserRouter>,container);
            
            const title = container.querySelector('.aboutus-features').innerHTML;
            expect(title).toBe('Features');
        })
    })
})

