import './App.css';
import { Container } from 'react-bootstrap';
import { BrowserRouter as Router,Route, Switch } from 'react-router-dom';
import Home from './Components/Home/Home'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import {Row} from 'react-bootstrap'
import QueryForm from './Components/QueryForm/QueryForm';
import Login from './Components/LogIn/LogIn'
import LogOut from './Components/LogIn/LogOut'
import SignUp from './Components/SignUp/SignUp';
import SolnForm from './Components/SolnForm/SolnForm';
import Query from './Components/Query/Query';
import AboutUs from './Components/AboutUs/AboutUs';
import Profile from './Components/Profile/Profile'
import UpdatePassword from './Components/ForgotPassword/UpdatePassword'
import React from 'react'
import Forgot from './Components/ForgotPassword/Forgotpass'
import {logedin,logedout} from './ReduxAction/Action'
import {connect} from 'react-redux';
import ShowQueries from './Components/ShowQueries/ShowQuery';
import Archieve from './Components/Archieve/Archieve';
import ProfileQuery from './Components/Profile/ProfileQuery';
import ProfileSolution from './Components/Profile/ProfileSolution';

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

class App extends React.Component {
  constructor() {
    super()
    this.state={loged:"false"};
      
    }
    
    onlog=()=>{
      this.setState({loged:"true"});
    }
    onout=()=>{
      this.setState({loged:"false"});
    }
   
  render(){
    

  return (
    <Container fluid className="container-home">
        <Router>
          <Row>
            <Header loged={this.state.loged}/>
          </Row>
          <Row className="middle">
            <Switch>
            <Route exact path="/">
             <Login onlog={this.onlog}/>
              </Route>
              <Route   exact path="/Home" >
                <Home />
              </Route>
              <Route exact path="/Ask">
                <QueryForm/>
              </Route>
              <Route exact path="/LogIn" >
                <Login onlog={this.onlog}/>
              </Route>
              <Route exact path="/SignUp">
                <SignUp/>
              </Route>
              <Route exact path="/Profile">
                <Profile/>
              </Route>
              <Route exact path="/Solution">
                <SolnForm/>
              </Route>
              <Route exact path="/Query" component={Query}>
               
              </Route>
              <Route exact path="/About">
                <AboutUs/>
              </Route>
              <Route exact path="/LogOut">
                <LogOut onout={this.onout}/>
              </Route>
              <Route exact path="/Forgot">
                <Forgot />
              </Route>
              <Route exact path="/ProfileQuery">
                <ProfileQuery />
              </Route>
              <Route exact path="/ProfileSolution">
                <ProfileSolution />
              </Route>
              
              <Route exact path="/UpdatePassword">
                <UpdatePassword />
              </Route>
              <Route exact path="/Archieve">
                <Archieve />
              </Route>
            </Switch>
          </Row>
          <Row className="footer">
            <Footer/>
          </Row>
        </Router>
    </Container>
  );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
