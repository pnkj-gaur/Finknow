
import React from 'react';
import {Form,Col,Button,Row, Container} from 'react-bootstrap';
import './AboutUs.css'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux';
// For user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class AboutUs extends React.Component{


    render(){

        
           return  <div className="aboutus-section">
            <div className="container">
                <div className="row black">
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="aboutus">
                            <h2 className="aboutus-title">About Us</h2>
                            <p className="aboutus-text">We are a personal finance specialist Platform. We empower our Users (print and digital) to make the best use of every rupee so that they can meet their financial goals through clear, comprehensive, credible and current information.</p>
                           <p className="aboutus-text">Finknow is a personal finance specialist. It will help you invest well, borrow wisely and spend smartly. It hopes to be your money manager, covering issues ranging from the best shares to buy (and the ones to sell and run) to the right insurance products for you, from the most attractive savings instruments to products that offer you the best value for money, from clever tax breaks to planning for your retirement.</p>
                            <a className="aboutus-more" href="#">Contact Us</a>
                            <p className="contact">--------------------------<br></br>
                             Mr. , Editor<br></br>
                              FinKnow,<br></br>
                                
                             THE FINKNOW INDIA GROUP , MEDIAPLEX FC-8, SECTOR - 16A, FILM CITY, NOIDA - 201301
                               TEL: +91-110-4906100 ,
                                 Email: FinknowIndia@gmail.com</p>
                        </div>
                    </div>
                    
                    <div className="col-md-6 col-sm-6 col-xs-12">
                        <div className="feature">
                        <h2 className="aboutus-features">Features</h2>
                            <div className="feature-box">
                                <div className="clearfix">
                    
                                    <div className="feature-content">
                                        <h4>Easy To Access</h4>
                                        <p>Finknow Provides An informative enviornment which is easy to Use and Understand.People can put their Ideas and knowledge in a very Appropiate manner and Preciseness.
                                        You will find all of this in an easy to understand language. You won’t need a doctorate in finance to comprehend what we write about. That is a promise we hold very dearly to. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-box">
                                <div className="clearfix">
                                    
                                    <div className="feature-content">
                                        <h4>Reliable Content</h4>
                                        <p>All Users who are using Finknow is Completely verified and the content they delivers is quite Reliable.People can also judge Answers given by Users from the Upvote feature of Finknow </p>
                                    </div>
                                </div>
                            </div>
                            <div className="feature-box">
                                <div className="clearfix">
                                    
                                    <div className="feature-content">
                                        <h4>Information Security</h4>
                                        <p>The information provided by the User is stored in access controlled facilities with restricted access. User Information transmitted over the internet is protected through the use of encryption, using the Secure Socket Layer (SSL) or equivalent protocols.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


        
      
    }
}

export default AboutUs;
