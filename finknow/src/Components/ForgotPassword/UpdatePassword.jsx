import React from 'react';
import { Form ,Button} from 'react-bootstrap';

import Query_Model from '../../Models/Query_Model';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {Forgotuser} from '../../Services/login';
import './forgot.css';
import Forgotcheck from '../../Models/forgotcheck';
import { Redirect } from 'react-router';
import {Updatepass} from '../../Services/login'
import Uppassword from '../../Models/updatepassword';

import {logedin,logedout} from '../../ReduxAction/Action'
import {connect} from 'react-redux';

// user validation
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


export default class UpForgot extends React.Component{

constructor(){

    super();
    this.state={

        npass:"",
        cpass:""
    }
}
  // Handle user inputs
npassHandler=(event)=>
{
    event.preventDefault();
    this.setState({npass:event.target.value})
}
cpassHandler=(event)=>
{
    event.preventDefault();
    this.setState({cpass:event.target.value})
}

onclickHandler=(event)=>{
    event.preventDefault();
    
    
    if(this.state.npass!==this.state.cpass)
    {
      alert("Confirm password should be same as New password");
        return;
    }
   
    var query=new Uppassword();
    query.Username=localStorage.getItem("passuser");
    query.Name=this.props.name;
    query.Email=this.props.email;
    query.Password=this.state.npass;
    // Calling the services to update the password.
    const data=Updatepass(query)
    data.then(x=>{
       
        if(x){
        alert("Password Changed Succesfully")
        }
    })
    .catch(err=>{
        alert("Error occured...");
    })
    localStorage.removeItem("passuser")
    

    this.setState({
           
        npass:"",
        cpass:""
       
    })
    
}





    render(){

    console.log(Object.keys(this.props).length);
    if(Object.keys(this.props).length==0){

        return <Redirect to='/Forgot'></Redirect>
    }
    else{
        
            return(
            
                <div className="QueryForm">
                <Container className="query-cont">
                    <Row >
                        <Col className="left">
                            <div>
                                <img src="https://images.unsplash.com/photo-1603899122634-f086ca5f5ddd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=667&q=80" className="query-image" alt="Query image"></img>
                            </div>
                        </Col>
                        <Col className="right">
                          
                           <Form className="QueryForm-Form" className="mt-5">
                              
                            {/* <Select options={this.state.OptionList} onChange={this.dropdownHandler}></Select> */}
                            <form class="form-floating">
                            <input type="text" class="form-control" id="floatingInputValue" placeholder="New Password:"  onChange={this.npassHandler} value={this.state.npass}/>
                            <label for="floatingInputValue"><b>New Password</b></label>
                            </form>
                            <form class="form-floating">
                            <input type="text" class="form-control" id="floatingInputValue" placeholder="Confirm Password:"  onChange={this.cpassHandler} value={this.state.cpass}/>
                            <label for="floatingInputValue"><b>Confirm Password</b></label>
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
