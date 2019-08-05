import  axios from 'axios'; 
import _ from 'lodash';
import getFingerprint from '../helpers/getFingerprint';
import jwtDecode from 'jwt-decode';
import setHeader from '../helpers/setHeader';

//front end gui action len store
export const getErrors=(err)=>{
    return {
        type:"GET_ERRORS",
        payload: err
    }
}
//gui dl di len store
export const register=(data,history)=>{
    return (dispatch)=>{
        axios.post("http://localhost:5000/api/users/register",data)
    .then(res=>{
        //thanh cong xoa errors
        dispatch(getErrors({}))
        console.log('okkokokok')
        //dang ky thanh cong vao trang chu
       // alert('dn tp cong')
        //history.push("/")
    })
    .catch(err=>{
        if(err){
            console.log(err, 12312312312)
            dispatch(getErrors(_.get(err,"response.data")))
        }
    })
    }
    
}

export const login =(data, history)=>{
    //debugger //tu do dung debug
    const {email,password}=data
    return (dispatch)=>{
        getFingerprint((fingerprint)=>{
            console.log(fingerprint)
            
            axios.post("http://localhost:5000/api/users/login",{email,password,fingerprint})
            .then(res=>{
                const token =res.data.token;
                localStorage.setItem("token",token);
                const decoded=jwtDecode(token);//redux store
                console.log(decoded)
                dispatch(setCurrentUser(decoded))
               //viet ben setHeader
               setHeader(token,fingerprint)
               //dang nhap thanh cong xoa errors
               dispatch(getErrors({}))
                //history.push("/")
                //fingerprint
                console.log("run")
                
                //console.log("res:",res)
            })
            .catch(err=>{
                console.log(err)
                if(err){
                    dispatch(getErrors(_.get(err,"response.data")))
                }
            })
        })
    
    }
}
export const setCurrentUser=(data)=>{
    return {
        type:"SET_CURRENT_USER",
        payload:data
    }
}
//logout 1 la xoa localstorage, 2 là xóa auth ->isauth:false profile:{}, 3 xóa header
//het han jwt click logout
export const Logout =()=>{
    return (dispatch)=>{
        localStorage.removeItem("token");
        dispatch(setCurrentUser({}))
        //ham setheader ben helpers
        setHeader()
    }
}
export const getMyProfile=(id,callback)=>{
    return (dispatch) =>{
        axios.get(`http://localhost:5000/api/users/${id}`)
        .then(res=>{
            dispatch(setCurrentUser(res.data))
            callback(res.data);
        })
        .catch(err=>{
            if(err){
                dispatch(getErrors(_.get(err,"response.data")))
            }
        })
    }
}