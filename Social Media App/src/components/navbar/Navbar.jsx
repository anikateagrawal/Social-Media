import './navbar.scss'
import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WbSunnyOutlinedIcon from '@mui/icons-material/WbSunnyOutlined';
import GridViewOutlinedIcon from '@mui/icons-material/GridViewOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import { EmailOutlined } from '@mui/icons-material';
import { PersonOutlined } from '@mui/icons-material';
import { SearchOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { DarkModeContext } from '../../context/darkModeContext';
import { AuthContext } from '../../context/authContext';
const Navbar = () => {
  
  const {darkMode,toggle}=useContext(DarkModeContext);
    const {currentUser,logout}=useContext(AuthContext);

    const [logoutbtn,setLogout]=useState(false);

    const handleLogout=async()=>{
      logout();
    }
  return (
    <div className='navbar'>
        <div className="left">
            <Link to='/' style={{textDecoration:"none"}}>
                <span>AnySocial</span>
            </Link>
            <HomeOutlinedIcon/>
            {!darkMode?<DarkModeOutlinedIcon onClick={toggle}/>:<WbSunnyOutlinedIcon onClick={toggle}/>}
            
            <GridViewOutlinedIcon/>
            <div className="search">
                <SearchOutlined/>
                <input type="text" placeholder='Search...' />
            </div>
        </div>
        <div className="right">
            <PersonOutlined/>
            <EmailOutlined/>
            <NotificationsOutlinedIcon/>
            <div className="user" onClick={()=>setLogout(!logoutbtn)}>
                <img src={"/upload/"+currentUser.profilePic} alt="User Img" />
                <span>{currentUser.name}</span>
            </div>
            {logoutbtn && <button onClick={handleLogout}>Logout</button>}
        </div>
    </div>
  )
}

export default Navbar