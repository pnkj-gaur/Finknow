import React from 'react';
import { Container,Nav,NavDropdown,Navbar,Carousel} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css'

class Header extends React.Component {
  constructor() {
    super()
      
    }
  

  render() {
      let navbar;
      // If the user have login then the header will contain options like logout , archieve etc.
      if(this.props.loged=="true")
      {
          navbar=<Navbar collapseOnSelect expand="lg"  variant="dark" className="navbar">
                <Navbar.Brand href="#home"><b><font color="#009933">F</font></b>in<b><font color="silver">K</font></b>now</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Link className="nav-link" to="/Home">Home</Link>
                    <Link className="nav-link" to="/Ask">Ask Query</Link>
                    <Link className="nav-link" to="/Archieve">Archieve</Link>
                    
                    </Nav>
                    <Nav className="ml-auto right-aligned">
                    <NavDropdown title="Account" id="collasible-nav-dropdown" className="ml-auto" >
                        <Link className="dropdown-item" to="/Profile">Profile</Link>
                        {/* <Link className="dropdown-item" to="/Home">Saved Queries</Link> */}
                        <NavDropdown.Divider />
                        <Link className="dropdown-item" to="/LogOut">Log Out</Link>
                      </NavDropdown>
                      <Link className="nav-link" to="/About">About</Link>
                      
                    </Nav>
                    
                    
                </Navbar.Collapse>
            </Navbar>
      }
      else // will have link fot the login and register
      {
        navbar=<Navbar collapseOnSelect expand="lg"  variant="dark" className="navbar">
                <Navbar.Brand href="#home"><b><font color="#009933">F</font></b>in<b><font color="silver">K</font></b>now</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="mr-auto">
                    <Link className="nav-link" to="/Home">Home</Link>
                    
                    <Link className="nav-link" to="/About">About</Link>
                    </Nav>
                    <Nav className="ml-auto right-aligned">

                    <Link className="nav-link " to="/LogIn">Login</Link>
                    <Link className="nav-link" to="/SignUp">Sign Up</Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Navbar>
      }
    return (
      <Container fluid className="nav-con p-0">
         {navbar}
        
       
      </Container>
    )
  }
}
export default Header;