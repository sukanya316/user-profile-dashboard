import { useState } from 'react'
import Popup from 'reactjs-popup'
import {MdKeyboardArrowDown,MdClose} from 'react-icons/md'
import {AiOutlineSend} from 'react-icons/ai'
import './index.css'
const ChatPage = (props) => {
    const {userData,isChatOpen}=props
    const [chatOpen,setChatOpen]=useState(isChatOpen)
    const [msgsList,setMsgsList]=useState([`Hey ${userData.username}!`])
    const [val,setVal]=useState('')

    const closeChat=()=>{
        setChatOpen(false)
    }

    const onSend=()=>{
        //msgsList.push(val)
        setMsgsList([...msgsList,val])
        setVal('')
    }

    return(
        <div>
            <Popup open={chatOpen} closeOnDocumentClick onClose={closeChat}>
          <div className="chatpage-popup-container">
            <div className='chat-page-header' onClick={()=>setChatOpen(!chatOpen)}>
                <p ><img src={userData.profilepicture} alt={userData.name} className='user-profile'/>
                {userData.username}
                </p>
                <p>
                <MdKeyboardArrowDown className='chat-arrow'/>
                <MdClose className='close-icon' onClick={()=>closeChat()} />
                </p>
            </div>
            <ul style={{paddingTop:'25px',width:'100%'}}>{
                msgsList.map(msg=><li className='msg-item'>
                  <span >{msg}</span>
                </li>)
                }
            </ul>
            <hr/>
            <div className='input-container'>
                <input style={{width:'100%',outline:'white'}} type='input' value={val} onChange={(event)=>setVal(event.target.value)}/>
                <AiOutlineSend className='send-icon' onClick={onSend}/>
                </div>
          </div>
        </Popup>
        </div>
    )
}

export default ChatPage