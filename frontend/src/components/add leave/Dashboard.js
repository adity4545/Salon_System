import { useEffect, useState } from 'react'
import axios from "axios"
import './repoart.css'

function LeavingRepoart(){
    const [countlist,setcountlist]=useState([]);
    const [customerlist,setcustomerlist]=useState([]);


//read
const getfetchdata=async()=>{
    try{
    const data=await axios.get("http://localhost:5000/leaving/count")
   const { count } = data.data;
   setcountlist(count);//get count
   setcustomerlist(data.data.data);//get table data
 
}catch(err){
    alert(err)
}
}
useEffect(()=>{
    getfetchdata()   
},[])





    
return(
    <div className='repoart'>
  <h3>Total List :</h3>
            {countlist !== null ? (
                <p>Total of  Leaving Employees: {countlist}
               
              
                </p>
                
            ) : (
                <p>Loading...
                     </p>
          
               
            )}

<h3> Summary Of Leaving Details  :</h3>
 

    

                  
                         <table>
                            <tr>
              <th>User Name</th>
              <th>User Email</th>
              <th>Reasons</th>
            
             
                            </tr>
<tbody>
    {
customerlist.map((e)=>{
                return(
                            <tr>
                                <td>
                                {e.name} 
                                </td>
                                <td>
                                {e.email}
                                </td>
                                <td>
                                {e.reason}
                                </td>
                               
                               
                            </tr>
                )
                              })
}
                            </tbody>
                        </table>
                        
            
              

                     
                    
                
                
          
           

    </div>
)




}
export default LeavingRepoart;