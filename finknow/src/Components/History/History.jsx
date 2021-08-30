
import React from 'react';
import {Card,Container,Row,Col, Form, Button} from 'react-bootstrap';
import './History.css'
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

class History extends React.Component{
    constructor(){
        super();
        this.state={pastdata:[]}
    }
    render()
    
    {
        return
        (
            <H1></H1>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(History);
