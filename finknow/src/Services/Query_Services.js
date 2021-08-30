// Adding new query to the database
function AddQuery(query)
{
    console.log(query);
    const url="https://localhost:44393/api/Queries";
    return fetch(url,{
        method:'POST',
        headers:{
            'content-type':'application/json'
        },
        body:JSON.stringify(query)
    });
}
// Getting all the queries from the database
async function GetAllQuery(category){
    let url="https://localhost:44393/api/Queries/catagory/"+category.toLowerCase();
    console.log(category)
    if(category=="All Query")
    {
        url="https://localhost:44393/all";
    }
    const response= await fetch(url);
    const data= await response.json();
    return data;
    
}


// Getting the solution based on the query id
async function GetSolutions(id){
    let url="https://localhost:44393/api/Solutions/ByQuery/"+id;
    const response= await fetch(url);
    const data= await response.json();
    return data;
  
}


module.exports={
    AddQuery,
    GetAllQuery,
    GetSolutions
}