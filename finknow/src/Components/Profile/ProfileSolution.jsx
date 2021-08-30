
import React from 'react';
import {Redirect} from 'react-router-dom'
import { profileQuery,profileSolution } from '../../Services/Profile_Services';
import ShowQueries from '../ShowQueries/ShowQuery'
import './Profile.css'
import {connect} from 'react-redux';
import { Container } from 'react-bootstrap';

const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class ProfileSolution extends React.Component{
    constructor() {
        super()
          this.state={allQueries:[]};
         
        }
        componentDidMount() {
    
          this.ProfileQuery();
          
    
        }
        // getting the querylist for which the user have provided the solution
        ProfileQuery=(catagory)=>{
    
            var queries=profileSolution(localStorage.getItem("username"));
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
                <h2 style={{textAlign:"center"}}>Solved Query</h2>
            <ShowQueries allQueries={this.state.allQueries} update={this.getAllQuery} path="home"/>
            </Container>)

        }
        else
        {
            return <Redirect to="/LogIn"></Redirect>
        }
    }
}

export default connect(mapStateToProps)(ProfileSolution);
