// Getting the toprated query based on the number of solution provided to the query by the users.
async function GetTopRatedQueries(){
    
    const url="https://localhost:44393/api/Queries/GetGroupBy";
    const response= await fetch(url);
    const data= await response.json();
    return data;
    
}
module.exports={
    GetTopRatedQueries
}
