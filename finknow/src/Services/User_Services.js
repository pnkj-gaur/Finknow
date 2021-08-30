// Adding the new user to the database
export default async function Register(user){
    console.log(user);
    let url="https://localhost:44393/api/Users";
  const res= await fetch(url,{
        method: 'POST',
        headers:
        {
            'content-type':"application/json"
        },
        body: JSON.stringify(user)
    })
    const data=await res.json();
    return data;

}
