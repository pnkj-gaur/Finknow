
import React from 'react';
import {Form,Col,Button,Row, Container, PageItem} from 'react-bootstrap';
import './Profile.css';
// getting the profile information of the user from the services 
import {getProfileDetails} from "../../Services/Profile_Services";
import {Redirect,Link} from  'react-router-dom'

import {connect} from 'react-redux';
// user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class Profile extends React.Component{
    constructor()
    {
        super();
        this.state={
            name:"Default",
            email:"Default.gmail.com",
            queries:0,
            solution:0
           
        }
    }
    async componentDidMount()
    {
        
       
       const username=localStorage.getItem("username");
       // Caling the services for getting the profile details based on the username (name,email,query asked and solution given)
       if(username!=undefined)
       {
        const info= await getProfileDetails(username);
        const name=await info.name;
        const email=await info.email;
        const queries=await info.numberOfQuery;
        const solution=await info.numberOfSolution;
        
        this.setState({
            name:name,
            email:email,
            queries:queries,
            solution:solution
        })
       }
      
       // this.setState(info);
    }
    
    render(){

        if(this.props.log==true)
        {  
           return <Container>
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center profile">
                        <div class="col-xl-6 col-md-12 main-card">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25"> <img src="https://img.icons8.com/bubbles/100/000000/user.png" class="img-radius" alt="User-Profile-Image"></img> </div>
                                            <h6 class="f-w-600">{this.state.name}</h6>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Email</p>
                                                    <h6 class="text-muted f-w-400">{this.state.email}</h6>
                                                    
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Phone</p>
                                                    <h6 class="text-muted f-w-400">98979989898</h6>
                                                </div>
                                            </div>
                                            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Contribution</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <Link to="/ProfileQuery" className="profile-links m-b-10 f-w-600">Asked Query</Link>
                                                    <h6 class="text-muted f-w-400">{this.state.queries}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <Link to="/ProfileSolution" className="profile-links m-b-10 f-w-600">Solved Query</Link>
                                                    <h6 class="text-muted f-w-400">{this.state.solution}</h6>
                                                </div>
                                            </div>
                                            <ul class="social-link list-unstyled m-t-40 m-b-10">
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="facebook" data-abc="true"><i class="mdi mdi-facebook feather icon-facebook facebook" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="twitter" data-abc="true"><i class="mdi mdi-twitter feather icon-twitter twitter" aria-hidden="true"></i></a></li>
                                                <li><a href="#!" data-toggle="tooltip" data-placement="bottom" title="" data-original-title="instagram" data-abc="true"><i class="mdi mdi-instagram feather icon-instagram instagram" aria-hidden="true"></i></a></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </Container>


        }
        else
        {
            return <Redirect to="/LogIn"></Redirect>
        }
    }
}

export default connect(mapStateToProps)(Profile);
