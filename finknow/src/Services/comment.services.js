// Adding comments to any solution
function AddComment(comment)
{
    const url="https://localhost:44393/api/Comments";
    return fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(comment)
    });
}

// Getting all the comments for any query's solution based on solution id
async function GetAllComments(sol_id){
    let url="https://localhost:44393/api/Comments/"+sol_id;
    const response= await fetch(url);
    const data= await response.json();
    return data;
  
}


module.exports={
    AddComment,
    GetAllComments
}