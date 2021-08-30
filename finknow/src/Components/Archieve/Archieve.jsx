
import React from 'react';
import {Card,Container,Row,Col, Form, Button} from 'react-bootstrap';
import './Archieve.css'
import {GetArchieve} from '../../Services/Archieve.Services'
import ShowQueries from '../../Components/ShowQueries/ShowQuery'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
// Validating the user 
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class Archieve extends React.Component{
    constructor(){
        super();
        this.state={archieve:[]}
    }
    // Calling the service to get the querylist for the user(Readlater)
    componentDidMount() {
        let res=GetArchieve(localStorage.getItem("username"));
        res.then(data=>{
            this.setState({archieve:data});
        })
      }
      UpdateAfterArchieve=()=>{
        let res=GetArchieve(localStorage.getItem("username"));
        res.then(data=>{
            this.setState({archieve:data});
        })
      }
    render()
    
    {
        if(this.props.log==true)
        {   
            return <Container className="archieve">
        <ShowQueries allQueries={this.state.archieve} update={this.getAllQuery} path="Archieve" updateDel={this.UpdateAfterArchieve}/>
        </Container>
        }
        else
        {
            return <Redirect to="/LogIn"></Redirect>
        }

    }
}

export default connect(mapStateToProps)(Archieve);
