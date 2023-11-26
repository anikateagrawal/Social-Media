import { useMutation, useQuery, useQueryClient } from 'react-query'
import { Link } from 'react-router-dom'
import { makeRequest } from '../../axios'
import './rightBar.scss'

const RightBar = () => {
  
  const { isLoading, error, data } = useQuery('suggestions', () =>
  makeRequest.get("/user/suggestions").then(res=>res.data)
)

const queryClient=useQueryClient();

const mutation = useMutation((id)=>{
return makeRequest.post("/relationships",{userid:id});
}, {
onSuccess: () => {
  // Invalidate and refetch
  queryClient.invalidateQueries()
},})

const handleFollow=(e)=>{
  mutation.mutate(e.target.getAttribute('val'));
}

const { isLoading:load, data:fdata } = useQuery('friends', () =>
  makeRequest.get("/user/friends").then(res=>res.data)
)


if(error)return 'error'+error.message;

  return (
    <div className='rightBar'>
      <div className="container">
        {isLoading?'loading':
        <div className="item">
          <span>Suggestions For You</span>
          {data.map((sug)=>(
          <div className="user" key={sug.id}>
            <Link to={"/profile/"+sug.id} className="userInfo">
              <img src={"/upload/"+sug.profilePic} alt="" />
              <span>{sug.name}</span>
            </Link>
            <div className="buttons">
              <button val={sug.id} onClick={handleFollow}>Follow</button>
              <button val={sug.id} >Dismiss</button>
            </div>
          </div>
          ))}
        </div>
        }
        <div className="item">
          <span>Latest Activities</span>
          <div className="user">
            <div className="userInfo">
              <img src='https://images.unsplash.com/photo-1685468499123-7494a1fe46d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt="" />
              <p><span>Anikate Agrawal</span>
              Changed profile photo</p>
            </div>
            <span>1 min ago</span>
          </div>
          <div className="user">
            <div className="userInfo">
              <img src='https://images.unsplash.com/photo-1685468499123-7494a1fe46d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw4Nnx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60' alt="" />
              <p><span>Anikate Agrawal</span>
              Changed profile photo</p>
            </div>
            <span>1 min ago</span>
          </div>
        </div>
        <div className="item">
          <span>Online Friends</span>
          {load?' loading':<>
          {fdata.map((friend)=>
          <div className="user" key={friend.id}>
            <Link to={"/profile/"+friend.id} className="userInfo">
              <img src={"/upload/"+friend.profilePic} alt="" />
              <div className="online"/>
              <span>{friend.name}</span>
            </Link>
          </div>
          )}
          
          </>}
        </div>
      </div>
    </div>
  )
}

export default RightBar