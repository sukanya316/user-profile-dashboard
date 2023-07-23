import { MapContainer,Marker,Popup,TileLayer } from 'react-leaflet';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css'
import './index.css'

const ProfileScreen=(props)=>{
    const {userDetails}=props
    const {address,company}=userDetails
    const geocode=[address?.geo?.lat!==undefined?address?.geo?.lat:0,address?.geo?.lng!==undefined?address?.geo?.lng:0]
    const geoCode=[isNaN(parseFloat(geocode[0]))?0:parseFloat(geocode[0]),isNaN(parseFloat(geocode[1]))?0:parseFloat(geocode[1])]
    console.log(userDetails,geoCode)

const customIcon=new Icon({
    iconUrl:'https://cdn-icons-png.flaticon.com/128/2642/2642502.png',
    iconSize:[38,38]
})

    return(
        <div className='profile-screen-container'>
            <div className='profile-details-container'>
                <img src={userDetails.profilepicture} alt={userDetails?.name} className='user-profile-big'/>
                <h3 style={{padding:'0px',margin:'0px'}}>{userDetails?.name}</h3>
                <div>
                <p><span className='color-gray'>Username:</span> {userDetails?.username}</p>
                <p><span className='color-gray'>e-mail:</span> {userDetails?.email}</p>
                <p><span className='color-gray'>Phone:</span> {userDetails?.phone}</p>
                <p><span className='color-gray'>Website: </span>{userDetails?.website}</p>
                </div>
                <hr/>
                <h4 className='color-gray' style={{padding:'0px',margin:'0px'}}>Company</h4>
                <p><span className='color-gray'>Name: </span>{company?.name}</p>
                <p><span className='color-gray'>catchphrase: </span>{company?.catchPhrase}</p>
                <p><span className='color-gray'>bs: </span>{company?.bs}</p>
            </div>
           <hr/>
            <div className='user-address-container'>
                <h4 className='color-gray' style={{paddingLeft:'10px'}}>Address</h4>
                <div style={{paddingLeft:'60px'}}>
                <p><span className='color-gray'>Street: </span>{address?.street}</p>
                <p><span className='color-gray'>Suite: </span>{address?.suite}</p>
                <p><span className='color-gray'>City: </span>{address?.city}</p>
                <p><span className='color-gray'>Zipcode: </span>{address?.zipcode}</p>
                </div>
                <MapContainer center={geoCode} zoom={4} className='leaflet-container' >
                    <TileLayer 
                    // attribution='&copy;<a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                     url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker key={userDetails?.address?.city} position={geoCode} icon={customIcon}>
                        <Popup>City: {userDetails?.address?.city}</Popup>
                    </Marker>
                </MapContainer>
                <p style={{textAlign:'end',fontSize:'12px'}}><span className='color-gray'>Lat:</span>  {geoCode[0]}, <span className='color-gray'>Long:</span> {geoCode[1]}</p>
               
            </div>
        </div>
    )
}
export default ProfileScreen