import {useLayoutEffect, useState } from 'react'
import {useParams,Link,useLocation} from 'react-router-dom'
import Popup from 'reactjs-popup'
import {MdOutlineKeyboardArrowRight} from 'react-icons/md'
import ProfileScreen from '../ProfileScreen'
import ComingSoonPage from '../ComingSoonScreen'
import Chats from '../Chats'
import './index.css'

const ProfileDetailsPage=(props)=>{
const location=useLocation()
const [currentScreen,setCurrentScreen]=useState('Profile');
const [users,setUsers]=useState([])
const [user,setUser]=useState({});
const [otherUsers,setOtherUsers]=useState([])
const [modalOpen,setModalOpen]=useState(false);
const prop=useParams()
const {id}=prop
console.log('profile details',otherUsers)

const getUserProfilesData=async()=>{
    const response =await fetch('https://panorbit.in/api/users.json');
    const data=await response.json()
    console.log(data.users)
    const firstInd=Number(id)-1<8&&Number(id)-1>=0?Number(id):Number(id)-2;
    const secondInd=firstInd+1;
    setUser(data.users[Number(id)-1])
    setOtherUsers([data.users[firstInd],data.users[secondInd]])
    setUsers(data.users)    
}

useLayoutEffect(()=>{
    getUserProfilesData()
},[location])

  const renderSwitch=()=>{
    switch(currentScreen){
        case 'Profile':
            return <ProfileScreen userDetails={user}/>
        case 'Posts':
            return <ComingSoonPage/>
        case 'Gallery':
            return <ComingSoonPage/>
        case 'ToDo':
            return <ComingSoonPage/>
        default:
            return null;
    }
  }

  const closeModal=()=>{
    setModalOpen(false)
  }

return(
    <div className='prfile-details-container'>
         <ul className='sidebar-container'>
            <li onClick={()=>setCurrentScreen('Profile')} className={currentScreen==='Profile'?'selected-item-highlight sidebar-item':'sidebar-item'}>
                <span style={{ borderBottom: '1px solid lightgray',width:'80%'}}>Profile </span>
                {currentScreen==='Profile' && <MdOutlineKeyboardArrowRight className='arrow'/>}
            </li>
            <li onClick={()=>setCurrentScreen('Posts')} className={currentScreen==='Posts'?'selected-item-highlight sidebar-item':'sidebar-item'}>
                <span style={{ borderBottom: '1px solid lightgray',width:'80%'}}>Posts</span>
                <span> {currentScreen==='Posts' && <MdOutlineKeyboardArrowRight className='arrow'/>}</span>
            </li>
            <li onClick={()=>setCurrentScreen('Gallery')} className={currentScreen==='Gallery'?'selected-item-highlight sidebar-item':'sidebar-item'}>
                <span style={{ borderBottom: '1px solid lightgray',width:'80%'}}>Gallery</span>
                <span> {currentScreen==='Gallery' && <MdOutlineKeyboardArrowRight className='arrow'/>} </span>
                </li>
            <li onClick={()=>setCurrentScreen('ToDo')} className={currentScreen==='ToDo'?'selected-item-highlight sidebar-item':'sidebar-item'}>
                <span style={{ borderBottom: '1px solid lightgray',width:'80%'}}>ToDo</span>
            <span> {currentScreen==='ToDo' && <MdOutlineKeyboardArrowRight className='arrow'/>}</span> 
            </li>
        </ul>
        <div style={{width:'100%',paddingLeft:'20px'}}>
            <div className='profile-header-container' onClick={()=>setModalOpen(!modalOpen)}>
                <h3 >{currentScreen}</h3>
                <p className='header-profile-contianer'>
                    <img className='user-profile' src={user.profilepicture} alt={user?.name}/>
                    <span> {user?.name}</span>
                </p>
            </div>
            <Popup open={modalOpen} closeOnDocumentClick onClose={closeModal}>
            <div className="popup-container">
                <img className='user-profile-popup' src={user.profilepicture} alt={user?.name}/>
                <h4 style={{margin:'0'}}> {user?.name}</h4>
                <span style={{margin:'0'}}>{user?.email}</span>
                <ul style={{padding:'0',width:'70%'}}>
                {
                otherUsers.map(user=>
                    <Link to={`/profile/${user.id}`} key={user.id} style={{textDecoration:'none',color:'lightgray'}}>
                    <li className='list-item' >    
                    <img className='user-profile' src={user.profilepicture} alt={user?.name}/>
                     <span> {user?.username}</span>
                     </li>
                    <hr/>
                 </Link>)
                }
            </ul>
            <Link to="/home" style={{outline:'none'}}>
                 <button type='button' className='signout-btn'>Signout</button>
            </Link>
          </div>
            </Popup>
            <hr/>
            {
                renderSwitch()
            }
           <Chats users={users}/>
        </div> 
    </div>
)
}
export default ProfileDetailsPage