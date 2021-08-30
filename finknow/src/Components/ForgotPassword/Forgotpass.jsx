import React from 'react';
import { Form ,Button} from 'react-bootstrap';

import Query_Model from '../../Models/Query_Model';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Forgotuser} from '../../Services/login';
import './forgot.css';
import UpForgot from '../ForgotPassword/UpdatePassword'
import Forgotcheck from '../../Models/forgotcheck';
import { Redirect } from 'react-router';


import {logedin,logedout} from '../../ReduxAction/Action'
import {connect} from 'react-redux';
// User validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    logedin:()=>dispatch(logedin()),
    logedout:()=>dispatch(logedout()),
  }
}


 export default class Forgot extends React.Component{

constructor(){

    super();
    this.state={

        name:"",
        email:"",
        flag:""
    }
}
  // User input handling
nameHandler=(event)=>
{
    event.preventDefault();
    this.setState({name:event.target.value})
}
emailHandler=(event)=>
{
    event.preventDefault();
    this.setState({email:event.target.value})
}

onclickHandler=(event)=>{
    event.preventDefault();
    // getting the system time 
    
    if(this.state.name.length==0)
    {
      alert("Field cannot be empty");
        return;
    }
    if(this.state.email.length==8)
    {
      alert("Field cannot be empty");
        return;
    }    
   // setting the username from localstorage
   let username=localStorage.getItem("username");    
    var query=new Forgotcheck(this.state.name,this.state.email);
    // adding the default time 
    
   
    
    
    const data=Forgotuser(query)
    data.then(x=>{
        console.log(x);
       
        if(x[0].auth=="true")
        {
            this.setState({
                flag:x[0].auth
            })
           
            
            
            localStorage.setItem('passuser',x[0].username);
            
           
        }
        else{
            alert("Invalid Credentials...")
        }
    })
    .catch(err=>{
        alert("Invalid Data ");
    })
    
    
}





    render(){
        if(this.state.flag=="true"){

     return   (<UpForgot  name={this.state.name} email={this.state.email} ></UpForgot>)
}
else{
    
        return(
            <div className="QueryForm">
            <Container className="query-cont">
                <Row >
                    <Col className="left">
                        <div>
                            <img src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80" className="query-image" alt="Query image"></img>
                        </div>
                    </Col>
                    <Col className="right">
                      
                       <Form className="QueryForm-Form" className="mt-5">
                          
                        {/* <Select options={this.state.OptionList} onChange={this.dropdownHandler}></Select> */}
                        <form class="form-floating">
                        <input type="text" class="form-control" id="floatingInputValue" placeholder="Enter Name:"  onChange={this.nameHandler} value={this.state.name}/>
                        <label for="floatingInputValue"><b>Name</b></label>
                        </form>
                        <form class="form-floating">
                        <input type="text" class="form-control" id="floatingInputValue" placeholder="Enter Email:"  onChange={this.emailHandler} value={this.state.email}/>
                        <label for="floatingInputValue"><b>Email</b></label>
                        </form>                       
                        <Button variant="primary" type="submit" className="mt-2" onClick={this.onclickHandler}>
                            Submit
                        </Button>
                    
                        </Form>

                    </Col>
                </Row>
                
            </Container>
          
        </div>
  

        )
        }
    }
}
