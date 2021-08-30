export const logedin=()=>{
    return {
        type:"logedin"
    }
}
export const logedout=()=>{
    return {
        type:"logedout"
    }
}
export const setUser=(uname)=>{
    return {
        type:"setUser",
        payload:uname
    }
}
export const delUser=()=>{
    return {
        type:"delUser"
    }
}