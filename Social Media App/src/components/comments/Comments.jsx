import { useContext, useState } from 'react'
import './comments.scss'
import {AuthContext} from '../../context/authContext'
import { useMutation, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import Comment from "./Comment";

const Comments = ({postid,data}) => {
    const {currentUser}=useContext(AuthContext);
    const [desc,setDesc]=useState("");

    const handleSubmit=async(e)=>{
        e.preventDefault();
        mutation.mutate({desc,postid});
        setDesc("");
    }

    const queryClient=useQueryClient();

    const mutation = useMutation((newComment)=>{
      return makeRequest.post("/comments",newComment);
    }, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('comments')
      },
    })

    

  return (
    <div className='comments'>
        <div className="write">
            <img src={"/upload/"+currentUser.profilePic} alt="" />
            <input type="text" placeholder='write a comment' value={desc} onChange={e=>setDesc(e.target.value)}/>
            <button onClick={handleSubmit}>Send</button>
        </div>
        {data.map(com=>(
            <Comment comment={com} key={com.id}/>
        ))}
    </div>
  )
}

export default Comments