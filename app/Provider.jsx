"use client"
const { datatransfer } = require("./_component/context");
import {useState} from 'react';
const DataProvider=({children})=>{
    const [user,setuser]=useState(null);
    const [usertype, setusertype] = useState(false);
    
    return (
        <datatransfer.Provider value={{user,setuser,usertype, setusertype}}>
            {children}
        </datatransfer.Provider>
    )
}
export default DataProvider;