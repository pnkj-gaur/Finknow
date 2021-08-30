 // passing the login crediential for validation
 async function Loginuser(user){

    let url=`https://localhost:44393/log`;


           const res=await  fetch(url,{
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
    
   // Hnadles the forgot user credentials management
    async function Forgotuser(details){
        
    
        let url=`https://localhost:44393/check`;
            
    
               const res=await  fetch(url,{
                      method: 'POST',
                   headers:
                {
                    'content-type':"application/json"
                },
                body: JSON.stringify(details)
            })
            const data=await res.json();
    
            return data;
        }
       // Updaing the password of the user
        async function Updatepass(password){
           
        
            let url="https://localhost:44393/api/TblUsers/"+password.Username;
                
           
                   const res=await  fetch(url,{
                          method: 'PUT',
                       headers:
                    {
                        'content-type':"application/json"
                    },
                    body: JSON.stringify(password)
                })
                const data=await res.json();
        
                return data;
            }


    module.exports={Loginuser,Forgotuser,Updatepass};