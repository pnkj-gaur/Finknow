
import React from 'react';
import {Card,Container,Row,Col, Form, Button} from 'react-bootstrap';
import './LogIn.css'
import {Link, Redirect} from 'react-router-dom'
import Loginuser from '../../Services/login'

import {logedin,logedout,setUser,delUser} from '../../ReduxAction/Action'
import {connect} from 'react-redux';

const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}
const mapDispatchToProps=(dispatch)=>{
  return {
    logedin:()=>dispatch(logedin()),
    logedout:()=>dispatch(logedout()),
    setUser:(user)=>dispatch(setUser(user)),
    delUser:()=>dispatch(delUser()),
  }
}

class LogOut extends React.Component{
    render()
    
    {
        this.props.logedout();
        this.props.delUser("null");
        this.props.onout();
        localStorage.removeItem("username");
        localStorage.removeItem("auth");
        return <Redirect to="/LogIn"></Redirect>
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(LogOut);
