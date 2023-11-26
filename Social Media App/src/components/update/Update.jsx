import { useContext, useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { makeRequest } from "../../axios";
import { AuthContext } from "../../context/authContext";
import "./update.scss";

const Update = ({setUpdate,currentUser}) => {

  const {update}=useContext(AuthContext);

    const [cover,setCover]=useState(null);
    const [profile,setProfile]=useState(null);

    const [texts,setTexts]=useState({
        name:currentUser.name,
        city:currentUser.city,
        website:currentUser.website
    })

    const upload=async(file)=>{
        try{
          const formData=new FormData();
          formData.append('file',file);
          const res=await makeRequest.post('/upload',formData);
          return res.data;
        }catch(err){
          console.log(err);
        }
      }
  

    const handleChange=(e)=>{
        setTexts(prev=>({...prev,[e.target.name]:[e.target.value]}))
    }

    const queryClient=useQueryClient();

    const mutation = useMutation((user)=>{
      update(user);
      return makeRequest.put("/user",user);
    }, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('user')
      },
    })

    const handleSave=async e=>{
        e.preventDefault();
        let coverPic=currentUser.coverPic;
        let profilePic=currentUser.profilePic;
        if(cover)coverPic=await upload(cover);
        if(profile)profilePic=await upload(profile);
        mutation.mutate({...texts,coverPic,profilePic});
        setUpdate(false);
    }

  return (
    <div className='updates'>
        <div className="form">
        <div className="head">
        <h1>Update </h1><span onClick={()=>setUpdate(false)}>X</span>
        </div>
        <div>Cover Photo : <input type="file" name="cover"  onChange={(e)=>setCover(e.target.files[0])}/></div>
        <div>Profile Photo : <input type="file" name="profile"  onChange={(e)=>setProfile(e.target.files[0])}/></div>
        <div className="name">
            Name : 
            <input type="text" name="name" onChange={handleChange} value={texts.name}/>
        </div>
        <div className="city">
            City : 
        <input type="text" name="city" onChange={handleChange} value={texts.city}/>
        </div>
        <div className="website">
            Website : 
        <input type="text" name="website" onChange={handleChange} value={texts.website}/>
        </div>
        <button onClick={handleSave}>Save</button>
        </div>
    </div>
  )
}

export default Update