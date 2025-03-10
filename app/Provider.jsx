"use client"
const { datatransfer } = require("./_component/context");
import {useState} from 'react';
const DataProvider=({children})=>{
    const [user,setuser]=useState(null);
    const [usertype, setusertype] = useState(false);
    const [Login, setLogin] = useState(false);
    
    return (
        <datatransfer.Provider value={{Login, setLogin,user,setuser,usertype, setusertype}}>
            {children}
        </datatransfer.Provider>
    )
}
export default DataProvider;