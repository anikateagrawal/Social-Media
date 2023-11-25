import Post from '../post/Post';
import './posts.scss';
import {useQuery } from 'react-query'
import { makeRequest } from '../../axios';
import { useNavigate } from 'react-router-dom';

const Posts = ({userid}) => {

  const navigate=useNavigate();

  const { isLoading, error, data } = useQuery('posts', () =>
    makeRequest.get("/posts?userid="+userid).then(res=>res.data)
  )

  if (isLoading) return 'Loading...'

  if (error){
    if(error.response.data==='Not Logged in!')navigate("/login");
    return 'An error has occurred: ' + error.response.data
  } 

  return (
    <div className='posts'>
      {data.map(post=>
        <Post post={post} key={post.id}/>
      )}
    </div>
  )
}

export default Posts