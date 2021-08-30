import React from 'react';
import { Form,Button } from 'react-bootstrap';
import "./SolnForm.css";
import Soln_Model from '../../Models/Soln_Model';
import {AddSolution} from '../../Services/Query_Services';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {logedin,logedout} from '../../ReduxAction/Action'
import {connect} from 'react-redux';
import { Redirect } from 'react-router';

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


class SolnForm extends React.Component{

    constructor()
    {
        super();
        this.state={
            id:"",  // given by the system by default 
            soln:"",
            solnAuth:"",
            queryId:""
        }
    }
    
    solutionHandler=(event)=>{
        event.preventDefault();
        this.setState({soln:event.target.value});
    }
    authorHandler=(event)=>{
        event.preventDefault();
        this.setState({solnAuth:event.target.value});
    }
    queryidHandler=(event)=>{
        event.preventDefault();
        this.setState({queryId:event.target.value});
    }
    onclickHandler=(event)=>
    {
        event.preventDefault();
        var solution=new Soln_Model();
        
        solution.SolnId =this.state.id;
        solution.SolnText=this.state.soln;
        solution.SolnBy=this.state.solnAuth;
        // at the time of writing the solution the upvote will be by default 0
        solution.UpVote=0;
        // this is for dummy input will manage it from props from homepage in future   while foreign key management
        solution.QueryId=this.state.queryId;
        AddSolution(solution).then(res=>res.json())
        .then(data=>{
            if(data){
                alert("Solution Added successfully");
            }
        })
        .catch(err=>{
            
            alert("Error Occured ");
        });
        this.setState({
            id:"",
            soln:"",
            solnAuth:"",
            queryId:""
        });
    }
    render()
    {
        if(this.props.log){
        return(
            <div className="SolnForm">

            <Container>
                <Row>
                    <Col className="left">
                         <div >
                                <img src="./query2.jfif" className="query-image" alt="Query image"></img>
                            </div>
                    </Col>
                    <Col>
                        <Form className="SolnForm-Form">
                        <h1 className="heading"><b>Solution Form </b></h1>
                        <form class="form-floating">
                        <input type="text" class="form-control" placeholder="Enter Solution"   onChange={this.solutionHandler} value={this.state.soln}/>
                        <label for="floatingInputValue"><b>Solution</b></label>
                        </form>
                        <form class="form-floating">
                        <input type="text" class="form-control" placeholder="Enter Author"   onChange={this.authorHandler} value={this.state.solnAuth}/>
                        <label for="floatingInputValue"><b>Author Name</b></label>
                        </form>
                        {/* This form is for dummy input for the query Id. In case of complete running project the query id will be passed as prop from the homepage.    */}
                        <form class="form-floating">
                            <input type="text" class="form-control" placeholder="Enter Query Id" onChange={this.queryidHandler} value={this.state.queryId}/>
                            <label for="floatingInputValue"><b>Query Id</b></label>
                        </form>
                        <Button variant="primary" type="submit" className="mt-2" onClick={this.onclickHandler}>Submit</Button>
                        </Form>
                    </Col>
                </Row>
            </Container>





              
            </div>
        )
        }
        else{

            return <Redirect to='/LogIn'></Redirect>
        }
    }
}


export default connect(mapStateToProps,mapDispatchToProps)(SolnForm);