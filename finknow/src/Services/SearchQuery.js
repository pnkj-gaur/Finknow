// for searching thr query based on query title
async function GetSearchdata(title){
    
    let url="https://localhost:44393/SearchByTitle/"+title;
    console.log(title,url);
    const res= await fetch(url)
      const data=await res.json();
      return data;
}

module.exports={GetSearchdata};