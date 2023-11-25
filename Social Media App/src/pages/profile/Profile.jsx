import { EmailOutlined, FacebookTwoTone, Instagram, Language, LinkedIn, MoreVert, Pinterest, Place, Twitter } from '@mui/icons-material'
import './profile.scss'
import Posts from "../../components/posts/Posts"
import { useMutation, useQuery, useQueryClient } from 'react-query'
import { makeRequest } from '../../axios'
import { useParams } from 'react-router-dom'
import { useContext, useState,} from 'react'
import { AuthContext } from '../../context/authContext'
import Update from '../../components/update/Update'


const Profile = () => {
  const {currentUser}=useContext(AuthContext);

  const [update,setUpdate]=useState(false);

  const params=useParams();

  const {  isLoading ,error,data } = useQuery('user', () =>
    makeRequest.get("/user/"+params.id).then(res=>res.data)
  )

  const {isLoading: rload,  data:followers } = useQuery('relations', () =>
    makeRequest.get("/relationships?userid="+params.id).then(res=>res.data)
  )

  const queryClient=useQueryClient();

  const mutation = useMutation((follows)=>{
    if(follows)return makeRequest.delete('/relationships',{data:{userid:params.id}});
  return makeRequest.post("/relationships",{userid:params.id});
}, {
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries('relations')
  },})

  const handleFollow=()=>{
    mutation.mutate(followers.includes(currentUser.id));
  }

  if(error)return error;
  return (
    <div className='profile'>
      {isLoading?('Loading'):
      (<><div className="images">
        <img src={"/upload/"+data.coverPic} alt="" className="cover" />
        <img src={"/upload/"+data.profilePic} alt="" className="profilePic" />
      </div>
      <div className="profileContainer">
        <div className="uInfo">
          <div className="left">
            <a href="http://facebook.com">
              <FacebookTwoTone fontSize='medium'/>
            </a>
            <a href="http://instagram.com">
              <Instagram fontSize='medium'/>
            </a>
            <a href="http://twitter.com">
              <Twitter fontSize='medium'/>
            </a>
            <a href="http://linkedin.com">
              <LinkedIn fontSize='medium'/>
            </a>
            <a href="http://pinterest.com">
              <Pinterest fontSize='medium'/>
            </a>
          </div>
          <div className="center">
            <span>{data.name}</span>
            <div className="info">
              <div className="item">
                <Place/>
                <span>{data.city}</span>
              </div>
              <div className="item">
                <Language/>
                <span>{data.website}</span>
              </div>
            </div>
            {rload?"loading":<>
            {currentUser.id===data.id?<button onClick={()=>setUpdate(true)}>Update</button>:
               (<button onClick={handleFollow}>{!followers.includes(currentUser.id)?"Follow":"Following"}</button> )
            }</>
            }
          </div>
          <div className="right">
            <EmailOutlined/>
            <MoreVert/>
          </div>
        </div>

        {update && <Update setUpdate={setUpdate} currentUser={data}/>}
        <Posts userid={params.id}/>
      </div></>)}

      
    </div>
  )
}

export default Profile