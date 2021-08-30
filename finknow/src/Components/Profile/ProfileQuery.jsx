
import React from 'react';
import {Redirect} from 'react-router-dom'
import { profileQuery } from '../../Services/Profile_Services';
import ShowQueries from '../ShowQueries/ShowQuery'
import './Profile.css'
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';
// user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class ProfileQuery extends React.Component{
    constructor() {
        super()
          this.state={allQueries:[]};
         
        }
        componentDidMount() {
    
          this.ProfileQuery();
          
    
        }
        // getting the query asked by the user based on the username
        ProfileQuery=(catagory)=>{
    
            var queries=profileQuery(localStorage.getItem("username"));
            queries.then(data=>{
              
              this.setState({allQueries:data});
             
            })
          
          }
    render(){

        if(this.props.log==true)
        {   
            console.log(this.state.allQueries)
            return (
            <Container className="profile-queries">
                <h2 style={{textAlign:"center"}}>Asked Query</h2>
            <ShowQueries allQueries={this.state.allQueries} update={this.getAllQuery} path="home"/>
            </Container>)

        }
        else
        {
            return <Redirect to="/LogIn"></Redirect>
        }
    }
}

export default connect(mapStateToProps)(ProfileQuery);
