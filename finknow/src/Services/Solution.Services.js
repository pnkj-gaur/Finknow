// Adding the solution
function AddSolution(sol)
{
    // Updated url as for mine AG
   // const url="https://localhost:44393/api/Solutions";
    const url="https://localhost:44393/api/Solutions";
    console.log(sol);
    return fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(sol)
    });
}
// Updating the existing solution based on the solution id
function UpdateSolution(sol,solid)
{
   const url="https://localhost:44393/api/Solutions/"+solid;
  
    return fetch(url,{
        method:'PUT',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(sol)
    });
}

module.exports={

    AddSolution,UpdateSolution
}