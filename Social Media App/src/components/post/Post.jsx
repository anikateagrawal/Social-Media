import './post.scss';
import { FavoriteBorderOutlined, FavoriteOutlined, MoreHoriz, ShareOutlined, TextsmsOutlined } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import Comments from '../comments/Comments';
import { useState } from 'react';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { makeRequest } from '../../axios';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';

const Post = ({post}) => {
    const [commentOpen,setCommentOpen] =useState(false);
    const {currentUser}=useContext(AuthContext);
    const [menu,setMenu]=useState(false);


    const handleLike=(e)=>{
        mutation.mutate(data.includes(currentUser.id));
    }

    const queryClient=useQueryClient();

    const mutation = useMutation((liked)=>{
        if(liked)return makeRequest.delete('/like',{data:{postid:post.id}});
      return makeRequest.post("/like",{postid:post.id});
    }, {
      onSuccess: () => {
        // Invalidate and refetch
        queryClient.invalidateQueries('likes')
      },
    })

    const deleteMutation = useMutation(()=>{
      return makeRequest.delete('/posts',{data:{postid:post.id}});
  }, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('posts')
    },
  })

  const handleDelete=()=>{
    deleteMutation.mutate();
  }


    const { isLoading, error, data } = useQuery(['likes',post.id], () =>
    makeRequest.get("/like?postid="+post.id).then(res=>res.data)
  )
  

  const { isLoading:load,  data:cdata } = useQuery(['comments',post.id], () =>
    makeRequest.get("/comments?postid="+post.id).then(res=>res.data)
  )

  if (load) return 'Loading...'
  if (isLoading) return 'Loading...'
  if (error){
    return 'An error has occurred: ' + error.response.data
  } 
  
  return (
    <div className='post'>
        <div className="container">
        <div className="user">
            <div className="userInfo">
                <img src={"/upload/"+post.profilePic} alt="" />
                <div className="details">
                    <Link to={`/profile/${post.userid}`} style={{textDecoration:'none',color:"inherit"}}>
                        <span>{post.name}</span>
                    </Link>
                    <span className='date'>{moment(post.createdAt).fromNow()}</span>
                </div>
            </div>
            <div className="more">
            {post.userid===currentUser.id && <MoreHoriz onClick={()=>setMenu(!menu)}/>}
            {menu && <button onClick={handleDelete}>Delete</button>}
            </div>
        </div>
        <div className="content">
            <p>{post.desc}</p>
            <img src={"/upload/"+post.img} alt="" />
        </div>
        <div className="info">
            <div className="item">
                {!(data.includes(currentUser.id))?<FavoriteBorderOutlined onClick={handleLike}/>:<FavoriteOutlined onClick={handleLike} style={{color:"red"}}/>}
                {data.length} Likes
            </div>
            <div className="item" onClick={()=>setCommentOpen(!commentOpen)}>
                <TextsmsOutlined/>
                {cdata.length} Comments
            </div>
            <div className="item">
                <ShareOutlined/> Share
            </div>

        </div>
        {commentOpen&&<Comments postid={post.id} data={cdata} />}
        </div>
    </div>
  )
}

export default Post