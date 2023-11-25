import "./leftBar.scss";
import Friends from "../../assets/friends.jfif";
import Group from "../../assets/group.png";
import Market from "../../assets/market.jfif";
import Memories from "../../assets/memories.png";
import Watch from "../../assets/watch.png";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
const LeftBar = () => {
  const {currentUser,logout}=useContext(AuthContext);
  const [logoutbtn,setLogout]=useState(false);

    const handleLogout=async()=>{
      logout();
    }
  return (
    <div className="leftBar">
      <div className="container">
        <div className="menu">
          <div className="user" onClick={()=>setLogout(!logoutbtn)}>
            <img
              src={"/upload/"+currentUser.profilePic}
              alt="User Img"
            />
            <span>{currentUser.name}</span>
          </div>
          {logoutbtn && <button onClick={handleLogout}>Logout</button>}
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Group} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>

        <hr />
        <div className="menu">
          <span>Your Shortcuts</span>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Group} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
        <hr />
        <div className="menu">
          <span>Others</span>
          <div className="item">
            <img src={Friends} alt="" />
            <span>Friends</span>
          </div>
          <div className="item">
            <img src={Group} alt="" />
            <span>Groups</span>
          </div>
          <div className="item">
            <img src={Market} alt="" />
            <span>Market</span>
          </div>
          <div className="item">
            <img src={Watch} alt="" />
            <span>Watch</span>
          </div>
          <div className="item">
            <img src={Memories} alt="" />
            <span>Memories</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeftBar;
