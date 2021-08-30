const auth=false;
const user="null";

const isValid=(state=auth,action)=>{
    switch(action.type){
        case "logedin":return true;
        case "logedout":return false;
        default:return state;
    }
}

const Username=(state=user,action)=>{

    switch(action.type){
        case "setUser":return action.payload;
        case "delUser":return null;
        default:return state;
    }
}

export  {Username,isValid};