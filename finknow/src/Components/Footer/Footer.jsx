import React from 'react';
import { Container} from 'react-bootstrap';
import './Footer.css'

class Footer extends React.Component {
  constructor() {
    super()
      
    }
  

  render() {
    return (
      <Container fluid className="footer">
          <p >All rights reserved by: <b><font color="#009933">F</font></b>in<b><font color="silver">K</font></b>now</p>
        
      </Container>
    )
  }
}
export default Footer;