import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

const HomePage=()=>{
const [users,setUsers]=useState([])
console.log(users)

const getUserProfilesData=async()=>{
const response =await fetch('https://panorbit.in/api/users.json');
const data=await response.json()
console.log(data.users)
setUsers(data.users)
}

useEffect(()=>{
   getUserProfilesData() 
},[])
    return(
<div className='home-container'>
    <div className='userprofiles-container'>
       <h4 style={{height:'20%',backgroundColor:'lightgray',textAlign:'center',marginTop:'0',paddingTop:'6%'}}>Select an account</h4>
       <ul>
        {
            users.map(user=>
                <Link to={`/profile/${user.id}`} key={user.id} style={{textDecoration:'none',color:'lightgrey'}}>
            <li className='list-item' >    
                <img className='user-profile' src={user.profilepicture} alt={user?.name}/>
              <span> {user?.username}</span>
            </li>
            <hr/>
            </Link>)
        }
       </ul>
    </div>
</div>
    )
}
export default HomePage