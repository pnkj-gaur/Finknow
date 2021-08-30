import React from 'react';
import { Card} from 'react-bootstrap';
import './TopRated.css'
import {GetTopRatedQueries} from "../../Services/TopRatedQuery";
import ShowQueries from "../ShowQueries/ShowQuery";
class TopRated extends React.Component {
  constructor() {
    super();
    this.state={
      TopRated:[]
    }
      
    }
  componentDidMount()
  {
    this.getQueries();
  }
  getQueries=()=>
  {
    let data=GetTopRatedQueries(); // Calling the services 
 
    data.then(
      res=>{
        this.setState({TopRated:res}) //setting the result to the state.
      }
    );
  }

  render() {
      
    return (
        <div className="side-card-div">
            <h4>Top Rated Queries</h4>
            <ShowQueries allQueries={this.state.TopRated} update={this.getAllQuery} path="home"/>
        </div>
    )
  }
}
export default TopRated;