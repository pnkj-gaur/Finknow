import React from 'react';
import { Card,Accordion,Button, Container} from 'react-bootstrap';
import {AddComment,GetAllComments} from '../../Services/comment.services'

class Comments extends React.Component{
    constructor() {
        
        super()
          this.state={comments:[],commentinput:""}
        }
        componentDidMount() {
            this.getComments();
          }
          // updaing the solution after adding a new comments
        componentDidUpdate(){
            if(this.props.sol_id!=this.state.curr_sol_id)
            {
                this.getComments();
            }
            
        }
        // Getting all the comments for a specific solution based on the solution id
        getComments=()=>{
        
          var cmt=GetAllComments(this.props.sol_id);
          cmt.then(c=>{
            this.setState({comments:c,curr_sol_id:this.props.sol_id,commentinput:""});
          })
        }
        // Handling the user input
        commentHandle=(e)=>{
            this.setState({commentinput:e.target.value});
        }
        // Adding the comments to the database
        commSubmit=()=>{
            let cmt={comment1:this.state.commentinput,solId:this.props.sol_id,username:localStorage.getItem("username")};
            let res=AddComment(cmt);
            res.then(data=>data.json()).then(item=>{
                alert("done");
               
                this.getComments();
            })
        }
    render()
    {
        
        let allcomments;
        allcomments=this.state.comments.map(i=>{
            if(i.commentId!="null")
            {
                return <div class="d-flex justify-content-center py-2">
                            <div class="second py-2 px-2"> <span class="text1">{i.comment1}</span>
                                <div class="d-flex justify-content-between py-1 pt-2">
                                    <div><img src="https://i.imgur.com/AgAC1Is.jpg" width="18"></img><span class="text2">{i.username.substring(0,(i.username.length)-2)}</span></div>
                                    {/* <div><span class="text3">20-04-2020</span></div> */}
                                </div>
                            </div>
                        </div>
            }
            else
            {
                return <p style={{textAlign:"center"}}>start discussion</p>
            }
        
                })
        return (
            <div class="container justify-content-center mt-5 border-left border-right">
                    <div class="d-flex justify-content-center pt-3 pb-2 form-comm"> <input type="text" onChange={this.commentHandle} value={this.state.commentinput} name="cmt" placeholder="+ Add your view" class="form-control addtxt"/> <Button className="post-btn" onClick={this.commSubmit}>Post</Button></div>
                    {allcomments}
                </div>
        )
    }  
}

export default Comments;