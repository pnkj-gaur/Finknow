import React from 'react';
import { Card,Button} from 'react-bootstrap';
import { Redirect,Link } from 'react-router-dom';
import './ShowQuery.css'

import {connect} from 'react-redux';
import { DelArchieve } from '../../Services/Archieve.Services';
// user validation
const mapStateToProps=(props)=>{
  return {
    log:props.isvalid,
    username:props.username
  }
}


class ShowQueries extends React.Component {
  constructor() {
    super();
    }


  handleUpdate=()=>{
    this.props.update(); // Update the query in case of change
  }
  delLater=(qid)=>{
    DelArchieve(qid);
    this.props.updateDel();
    alert("deleted successfully");

  }
  render() {
      let dummy=this.props.allQueries.map(item=>{
        let delBtn;
        // if(this.props.path=="Archieve")
        // {
        //   delBtn=<Button onClick={()=>{this.delLater(item.queryId)}} className="del-arch-btn">Remove from Archieve</Button>
        // }
        return <Card className="card"> 
            <Card.Header><font color="gray">{item.category}</font></Card.Header>
            <Card.Body>
            <Card.Title>{item.title.substring(0,70)}...</Card.Title>
            <Card.Text>
                {item.description.substring(0,200)}...
            </Card.Text>
            <Link to={{pathname:"/Query",state:{q_id:item.queryId,query:item,path:this.props.path}}}  className="get-btn" >Open</Link>
            {delBtn}
            </Card.Body>
        </Card>
      })
    return (
        <div className="card-div">
            
        {dummy}
        </div>
    )
  }
}
export default connect(mapStateToProps)(ShowQueries);