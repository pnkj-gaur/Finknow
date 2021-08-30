
import React from 'react';
import {Form,Col,Button,Row,Carousel, Container} from 'react-bootstrap';
import './SignUp.css';
import Register from '../../Services/User_Services';
import User from '../../Models/user_model';
import {Link} from 'react-router-dom'


class SignUp extends React.Component{

      constructor()
      {
        super();
        this.state={name:"",email:"",password:"",confirm:""};
      }
      // Handling the user input
      handle_signup=(e)=>{
        if(e.target.name=="name")
        {
            this.setState({name:e.target.value})
        }
        if(e.target.name=="email")
        {
            this.setState({email:e.target.value})
        }
        if(e.target.name=="password")
        {
            this.setState({password:e.target.value})
        }
        if(e.target.name=="confirm")
        {
            this.setState({confirm:e.target.value})
        }
        
      }
      // saving data to the database
      submit=(e)=>{
        e.preventDefault();
        // validating the user input
        if(this.state.name.length<=3)
        {
          alert("enter valid name");
            return;
        }
        if(this.state.email.length<=8 || this.state.email.indexOf("@") == -1)
        {
          alert("enter valid email");
            return;
        }
        
        if(this.state.password.length<8)
        {
          alert("password should be of atleast 8 character long");
            return;
        }
        
        if(this.state.confirm!==this.state.password)
        {
          alert("confirm password should be same as password");
            return;
        }
        //putting data into the models
        var user=new User(this.state.name,this.state.email,this.state.password);
        //calling the services
        var data=Register(user);
        data.then(x=>{
          
          if(x.name==this.state.name){
            alert("Saved Succesfully..")
          }
         
        })
        .catch(err=>{
          alert("Error Occured..")
        })
        
      }
    render(){

        return(
        <Container className="align">
    
          <Row>
          <Col  column sm="6" className="form-div">
               
              
                  <form action="/action_page.php" method="post" className="log-form">

                        <div class="container">
                          <label for="name"><b>Name</b></label>
                          <input type="text" placeholder="Enter Name" name="name" onChange={this.handle_signup}required></input>

                          <label for="email"><b>Email</b></label>
                          <input type="text" placeholder="Enter Email" name="email"onChange={this.handle_signup} required></input>

                          <label for="password"><b>Password</b></label>
                          <input type="password" placeholder="Enter Password" name="password" onChange={this.handle_signup} required></input>

                          <label for="confirm"><b>Confirm Password</b></label>
                          <input type="password" placeholder="Confirm Password" name="confirm" onChange={this.handle_signup} required></input>
                              
                          <button type="submit" onClick={this.submit}>Sign Up</button>
                        
                        </div>

                        <div class="container link-div" style={{backgroundColor:"#f1f1f1"}}>
                          <span><Link to="/LogIn">Already have an account? Log In</Link></span>
                        </div>
                </form>
        </Col>
     
  
         <Col column sm="6" className="img-log">
                    <img src="https://orami.org/wp-content/uploads/sites/32/2018/06/sign-up-genius-logo-png.png" className="image" />
         </Col>
  
      </Row>
   


</Container>

        )
    }
}

export default SignUp;