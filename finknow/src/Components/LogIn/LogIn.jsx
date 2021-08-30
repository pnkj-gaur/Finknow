
import React from 'react';
import {Card,Container,Row,Col, Form, Button} from 'react-bootstrap';
import './LogIn.css'
import {Link, Redirect} from 'react-router-dom'
import {Loginuser} from '../../Services/login'
import Userlogin from '../../Models/userlogin';
//from here -redux
import {logedin,logedout,setUser,delUser} from '../../ReduxAction/Action'
import {connect} from 'react-redux';
// for user validation
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
//end redux
class Login extends React.Component{
constructor(){
  super();
  this.state={

    
    email:"",
    password:"",
    token:""
 
  }
}
// handling the user input
handleevent=(e)=>{
  e.preventDefault();
  if(e.target.name=="email"){

    this.setState({
      email:e.target.value
    })
  }
 else if(e.target.name=="password"){

    this.setState({
      password:e.target.value
    })
  }

 
}
// validating the usser by calling the services and sending the data in "POST"  method and the response will be boolean
submit=(e)=>{
  e.preventDefault();
       
        if(this.state.email.length==0)
        {
          alert("enter valid email");
            return;
        }
        if(this.state.password.length<8)
        {
          alert("password should be of atleast 8 character long");
            return;
        }    
    let users=new Userlogin();
    users.email=this.state.email;
    users.password=this.state.password;
    let data=Loginuser(users);
    data.then(x=>{
    
      if(x[0].auth=="true")
      {
      alert("Login Successfully");
      this.props.onlog();
      this.props.logedin();
      this.props.setUser(x[0].username);
      localStorage.setItem('username',x[0].username);
      localStorage.setItem('auth',x[0].auth);
      }
      else{
        alert("invalid credentials...")

      }
    
    })

}

    render(){
      if(this.props.log){
        return <Redirect to='/Home'></Redirect>
      }
      else{

        return <Container ><br></br>
            
        <Row>
            <Col className="img-log">
                <img src="https://thumbs.dreamstime.com/b/forgot-password-computer-concept-unhappy-man-near-account-login-flat-vector-male-character-design-landing-page-web-poster-184010038.jpg" className="image" />
            </Col>

            <Col className="log-div">
            <form className="log-form">
              <div class="imgcontainer">
                <img src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg" alt="Avatar" class="avatar"></img>
              </div>

              <div class="container ">
                <label for="uname"><b>E-mail</b></label>
                <input type="text" placeholder="Enter E-mail" value={this.state.email} onChange={this.handleevent} name="email" required ></input>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" value={this.state.password} onChange={this.handleevent}  name="password" required ></input>
                    
                <button type="submit" onClick={this.submit}>Login</button>
               
              </div>

              <div class="container link-div" style={{backgroundColor:"#f1f1f1"}}>
                <span class="cancelbtn"><Link to="/SignUp">Don't have account?</Link></span>
                <span class="psw"><Link to="/Forgot">Forgot Password?</Link></span>
              </div>
            </form>
          </Col>
           
        </Row>
      
    </Container>
  
      }

        
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
