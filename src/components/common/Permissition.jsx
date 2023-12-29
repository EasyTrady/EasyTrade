import useRequest from 'hooks/useRequest'
import { YOURSPERMISSIONS } from 'data/api';
import { useDispatch, useSelector } from 'react-redux';
import {useEffect} from "react"
function Permissition({children,permission,type}) {
    let Token = localStorage.getItem('token')
    let permissionYour = useSelector((state) => state.permissionYour.value)

    let dispatch=useDispatch()
    const [permissionYourRequest, permissionYourResponce] =
    useRequest({
        path: YOURSPERMISSIONS,
        method: "get",
        Token: `Token ${Token}`
    });
    // useEffect(()=>{
    //     if(permissionYour?.length==0){
    //         permissionYourRequest({
    //             onSuccess:(res)=>{
    //                 dispatch({type:"yourspermission/set",payload:res.data})
    //             }
    //         })
    //     }
        
    // },[permissionYour?.length])

  return (
    ((type=="collapse"? permission?.some((ele)=>permissionYour.map((elem)=>elem?.codename).includes(ele)):permission?.map((ele)=>permissionYour.map((elem)=>elem?.codename).includes(ele)))||permission?.length==0) &&children
  )
}
export default Permissition