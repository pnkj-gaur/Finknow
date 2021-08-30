import React from 'react';
import { Card,Accordion,Button, Container} from 'react-bootstrap';
import './Query.css'
import { GetSolutions} from '../../Services/Query_Services'
import {AddSolution,UpdateSolution} from '../../Services/Solution.Services'
import Solution  from '../../Models/Soln_Model';

import {connect} from 'react-redux';
import EditSol from '../../Models/EditSol';
import Comments from '../Comments/Comments';
import { Archieve } from '../../Services/Archieve.Services';
import {Redirect} from 'react-router-dom'
//user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}

class Query extends React.Component{
    constructor() {
        
        super()
          this.state={vote:"down",displaymaster:"none",sol_form_value:"",allSolutions:[],comment:false,addsol:false,solution:"",editsol:false,currSol:0,UpVote:[],sol_data:""}
        }
        componentDidMount() {
            this.getSolutions();
            
          }
          //getting all the solution based on query id.
        getSolutions=()=>{
        
          var solution=GetSolutions(this.props.location.state.q_id);
          solution.then(sol=>{
              
            this.setState({allSolutions:sol});
          })
        }
    
    


   
   

    // Comment handler
    comment=(id)=>{
        if(this.state.displaymaster=="none")
        {
            this.setState({displaymaster:"block",comment:true,currSol:id});
        }
        else
        {
            this.setState({displaymaster:"none",comment:false});
        }
        
    }
    // adding the solution
    AddSol=()=>{
        if(this.state.displaymaster=="none")
        {
            this.setState({displaymaster:"block",addsol:true});
        }
        else
        {
            this.setState({displaymaster:"none",addsol:false});
        }
        
    }
    // editing the solution
    EditSol=(id,soltxt)=>{
        if(this.state.displaymaster=="none")
        {
            this.setState({displaymaster:"block",editsol:true,currSol:id,sol_form_value:soltxt});
        }
        else
        {
            this.setState({displaymaster:"none",editsol:false,sol_form_value:""});
        }
        
    }
    // submiting the solution to the database
    submitSolution=(e)=>{
        e.preventDefault();
        if(this.state.solution.length>20)
        {
            // checking wheather the user have given solution already or not
            var flag=true;
            this.state.allSolutions.map(solution=>{
                if(solution.author===localStorage.getItem("username"))
                {
                    console.log(solution.username,localStorage.getItem("username"));
                    flag=false;
                }
            })
            if(flag){
                var sol=new Solution(this.state.solution,localStorage.getItem("username"),this.props.location.state.query.queryId);
                var res=AddSolution(sol);
                res.then(data=>data.json()).then(item=>{
                    if(item.title=="Conflict")
                    {
                        alert("You already have submitted the solution");
                    }
                    else{
                        alert("Solution submitted successfully");
                        this.getSolutions();
                        this.AddSol();
                    }
                })
            }
            else{alert("You already have submitted the solution");this.AddSol();}
           
            return
        }
        else
        {
            if(this.state.solution.length==0)
            {
                alert("solution should not be empty");
                return;
            }
            else{
                alert("solution should be of atleast 20 character...");
                return;
            }
            
        }

    }

//edit solution function

    editSolution=(e)=>{
        e.preventDefault();
        var sol_id=e.target.value;
        if(this.state.solution.length>20)
        {
           
        
                var sol=new EditSol(sol_id,this.state.solution,localStorage.getItem("username"),this.props.location.state.query.queryId);
                var res=UpdateSolution(sol,sol_id);
           
                res.then(item=>{
                        if(item.status==204)
                        {
                            this.getSolutions();
                            this.EditSol();
                            alert("Data Updated successfully")
                        }
                    
                }).catch(e=>{
                    console.log(e);
                })
            
         
           
            return
        }
        else
        {
            if(this.state.solution.length==0)
            {
                alert("solution should not be empty");
                return;
            }
            else{
                alert("solution should be of atleast 20 character...");
                return;
            }
            
        }

    }

//handle input
    solutionHandle=(e)=>{
        this.setState({solution:e.target.value,sol_form_value:e.target.value});

    }
    AddLater=()=>{
        let later={username:localStorage.getItem("username"),queryId:this.props.location.state.query.queryId};
        let res=Archieve(later);
        res.then(data=>data.json()).then(item=>{
            if(item.queryId==-1)
            {
                alert("query already archieved");
            }
            if(item.queryId==1)
            {
                alert("query archieved successfully");
            }
            if(item.queryId==0)
            {
                alert("server errror!");
            }
        })
        
    }
    render()
    {
 
        

        let solutions=<h5 style={{textAlign:"center"}}>No solution available,be the first one to contribute.</h5>;
// All solution UI-Card//
        if(this.state.allSolutions.length!=0)
        {
            
            solutions=this.state.allSolutions.map(sol=>{
                var btn="";
                if(sol.author==this.props.username)
                {
                    btn=<Button onClick={() => this.EditSol(sol.id,sol.solution)}>Edit</Button>
                }
              
                return <Card className="sol-card">
                        <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey={sol.id} >
                            {sol.solution.substring(0,20)}
                        </Accordion.Toggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={sol.id}>
                        <Card.Body className="sol-body">
                            {sol.solution}
                    <p className="author"><br></br>Solution by: {sol.author}</p>
                    {btn}
                    <Button onClick={() => this.comment(sol.id)} className="comment-btn">Discussion</Button>
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card >
            })
        }
// background fix
        this.commentstyle={overflow:"auto",height:"auto"};
        if(this.state.comment || this.state.addsol )
        {
            this.commentstyle={overflow:"hidden",height:"550px"};
        }
//discussion popup code
        if(this.state.comment==true)
        {
                this.popup=<div className="trial">
                <a onClick={this.comment}><span className="span">&#10008;</span></a>
                <h4 className="comment-h4">Discussion</h4>
                    <Comments sol_id={this.state.currSol}/>
                </div>
        }
//add solution and edit solution pop up
        if(this.state.addsol==true || this.state.editsol==true)
        {
            let btn=<Button  onClick={this.submitSolution} className="add-sol-btn">Submit</Button>
            let close=<a onClick={this.AddSol}><span className="span">&#10008;</span></a>
            let content=this.state.solution;
            if(this.state.editsol)
            {
                btn=<Button value={this.state.currSol} onClick={this.editSolution} className="add-sol-btn">Submit</Button>
                close=<a onClick={this.EditSol}><span className="span">&#10008;</span></a>
                content=this.state.sol_form_value;
            }
            
            this.popup=<div className="trial">
            {close}
            <h4 className="comment-h4">Give Solution</h4>
            <form className="text-area">
                <div >
                    <textarea class="form-control" value={content} onChange={this.solutionHandle} id="exampleFormControlTextarea1" rows="3" placeholder="you can adjust size of box from bottom-right..."></textarea>
                    {btn}
                </div>
            </form>
            </div>
        }

        let arcBtn=<Button onClick={this.AddLater} className="add-arch-btn">Archieve</Button>;
        if(this.props.location.state.path=="Archieve")
        {
            arcBtn="";
        }
        
        
     
            if(this.props.log==true)
            {
             return <Container className="query-sec" style={this.commentstyle} >
                <div className="master" style={{display:this.state.displaymaster}}>
                        {this.popup}
                </div>

                <h3>Question</h3>
                <Card className="query">
                    <Card.Header as="h5">Question</Card.Header>
                    <Card.Body>
                        <Card.Title className="title">{this.props.location.state.query.title}</Card.Title>
                        <Card.Text className="question">
                            {this.props.location.state.query.description}
                        </Card.Text>
                        <Button onClick={this.AddSol} className="add-sol-btn">Give Solution</Button>
                        {arcBtn}
                    </Card.Body>
                </Card>

                <h3>Solutions</h3>
                <Accordion defaultActiveKey="0">
                    {solutions}
                </Accordion>
               
            
            </Container>
            }
        else
        {
            return <Redirect to="/LogIn"></Redirect>
        }
    }
   
}

export default connect(mapStateToProps)(Query);