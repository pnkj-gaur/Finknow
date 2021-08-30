// Adding the query to save for any user profile(Read later)
function Archieve(later)
{

    const url="https://localhost:44393/api/Readlaters/SaveQuery";
    let res=fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(later)
    });
    return res;
}

function DelArchieve(qid)
{

    const url="https://localhost:44393/api/Readlaters/"+qid+"/"+localStorage.getItem("username");

    let res=fetch(url,{
        method:'DELETE',

  
    });
    return res;
}
// Getting all the saved queries 
async function GetArchieve(username){
   
    let url="https://localhost:44393/api/Readlaters/readlater/"+username;
    const response= await fetch(url);
    const data= await response.json();
    return data;
  
}

module.exports={
    Archieve,
    GetArchieve,
    DelArchieve
}