import { useState } from 'react'
import Popup from 'reactjs-popup'
import {BsChatRight} from 'react-icons/bs'
import {MdKeyboardArrowDown,MdKeyboardArrowUp} from 'react-icons/md'
import {GoDot} from 'react-icons/go'
import ChatPage from '../ChatPage'
import './index.css'

const Chats=(props)=>{
    const {users}=props
    const [modalOpen,setModalOpen]=useState(false);
    const [chatOpen,setChatOpen]=useState(false);
    const [currentUser,setCurrentUser]=useState(users[0])
    console.log(users)

    const closeChats=()=>{
        setModalOpen(false)
    }

   const onChatClick=(user)=>{
        setChatOpen(!chatOpen);
        setCurrentUser(user)
    }
    return(
        <div className='chats-container' >
          {  
          modalOpen===false && <div className='chats-header' onClick={()=>setModalOpen(!modalOpen)} >
                <p><BsChatRight style={{marginTop:'6px',marginRight:'5px'}}/>
                <span>Chats</span></p>
                {modalOpen?<MdKeyboardArrowDown className='chat-arrow'/>:<MdKeyboardArrowUp className='chat-arrow'/>}
            </div>
            }
              <Popup open={modalOpen} closeOnDocumentClick onClose={closeChats}>
          <div className="chat-popup-container">
          <div className='chats-header' style={{width:'100%',borderBottomLeftRadius:'0px',borderBottomRightRadius:'0px'}} onClick={()=>setModalOpen(!modalOpen)}>
            <p><BsChatRight style={{marginTop:'6px',marginRight:'5px'}}/>
            <span>Chats</span></p>
            {modalOpen?<MdKeyboardArrowDown className='chat-arrow'/>:<MdKeyboardArrowUp className='chat-arrow'/>}</div>
            <ul style={{padding:'2px',margin:'0px'}}>
            {
            users.map(user=><li className='chat-list-item' key={user.id} style={{paddingLeft:'0px'}} onClick={()=>onChatClick(user)} >    
                <p className='chat-profile-item-contianer'><img className='user-profile' src={user.profilepicture} alt={user?.name}/>
              <span > {user?.username}</span>
              </p>
              <GoDot className={`${user.id%2===0?'chat-active':'chat-inactive'}`}/>
            </li>
           )
            }
            </ul>
          </div>
        </Popup>
        {
            chatOpen && <ChatPage userData={currentUser} isChatOpen={chatOpen} />
        }
        </div>
    )
}
export default Chats