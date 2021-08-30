import React from 'react';
import { Form ,Button} from 'react-bootstrap';
import './QueryForm.css'
import Query_Model from '../../Models/Query_Model';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {AddQuery, getAllQuery} from '../../Services/Query_Services';
import {addNewQuery} from '../../Services/Query_Services';
// import Select from 'react-select';

import {logedin,logedout} from '../../ReduxAction/Action'
import {connect} from 'react-redux';
import { Redirect } from 'react-router';
import Select from 'react-select';
// user validation
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

class QueryForm extends React.Component{
    constructor()
    {
        super();
        this.state={
            
            Title:"",
            Description:"",
            QueryBy:"",
            Category:"Others",
            OptionList:[
                {
                    value:1,
                    label:"investment"
                },
                {
                    value:2,
                    label:"business"
                },
                {
                    value:3,
                    label:"mutual funds"
                },
                {
                    value:4,
                    label:"loan"
                },
                {
                    value:5,
                    label:"Others"
                }
            ]
        }
    }
    // handling the user input
    titleHandler=(event)=>
    {
        event.preventDefault();
        this.setState({Title:event.target.value})
    }
    descriptionHandler=(event)=>
    {
        event.preventDefault();
        this.setState({Description:event.target.value})
    }
    dropdownHandler=(e)=>{
       this.setState({Category:e.label});
    }
    onclickHandler=(event)=>{
        event.preventDefault();
        if(this.state.Title.length==0)
        {
          alert("Title is mandatory");
            return;
        }
        else if(this.state.Title.length<10)
        {
          alert("Title must have atleast 10 character");
            return;
        }
        if(this.state.Description.length==0)
        {
          alert("Description is mandatory");
            return;
        }
        else if(this.state.Description.length<20)
        {
          alert("Description must have atleast 20 character");
            return;
        }    
        // getting the system time 
        
        
        // putting the state data into the model 
        //putting the default author name
       // this.setState.QueryBy="Avanish";  
       let time=new Date();  
       let username=localStorage.getItem("username");    
        var query=new Query_Model(this.state.Title,this.state.Description,time,username,this.state.Category);
        
        AddQuery(query).then(res=> res.json())
        .then(data=>{
            if(data)
            {
                alert("Query Added Successfully");
            }
        })
        .catch(err=>{
            alert("Error Occured ");
        })
        
        this.setState({
           
            Title:"",
            Description:""
           
        })
        
    }
   
    render()
    {
        if(this.props.log){
        
        return (
            <div className="QueryForm">
                <Container className="query-cont">
                    <Row >
                        <Col className="left">
                            <div>
                                <img src="./query.jpeg" className="query-image" alt="Query image"></img>
                            </div>
                        </Col>
                        <Col className="right">
                          
                           <Form className="QueryForm-Form" className="mt-5">
                              
                             <Select options={this.state.OptionList} onChange={this.dropdownHandler} > </Select> 
                            <form class="form-floating">
                            <input type="text" class="form-control" id="floatingInputValue" placeholder="Enter query Title:"  onChange={this.titleHandler} value={this.state.Title}/>
                            <label for="floatingInputValue"><b>Title</b></label>
                            </form>
                            <form class="form-floating">
                            <input type="text" class="form-control" id="floatingInputValue" placeholder="Enter query Description:"  onChange={this.descriptionHandler} value={this.state.Description}/>
                            <label for="floatingInputValue"><b>Query Description</b></label>
                            </form>                       
                            <Button  type="submit" className="mt-2 query-btn" onClick={this.onclickHandler}>
                                Submit
                            </Button>
                        
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


export default connect(mapStateToProps,mapDispatchToProps)(QueryForm);