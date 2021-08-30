// Getting the profile information from the  backend 
// like name,email, query asked and solution given
async function getProfileDetails(username)
{
  
   const url="https://localhost:44393/api/Users/Profile/"+username;
    const res=await fetch(url);
    const data=await res.json();
    return data;
}
// Getting the list of the query asked by the user
async function profileQuery(username)
{
    
   const url="https://localhost:44393/api/Users/querylist/"+username;
    const res=await fetch(url);
    const data=await res.json();
    return data;
}
// Getting the list of the solution provided by the user
async function profileSolution(username)
{
   
   const url="https://localhost:44393/api/Users/solutionlist/"+username;
    const res=await fetch(url);
    const data=await res.json();
    return data;
}



module.exports={
    getProfileDetails,
    profileQuery,
    profileSolution
}
