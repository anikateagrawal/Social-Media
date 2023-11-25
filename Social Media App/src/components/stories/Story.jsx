import { useContext } from 'react';
import {AuthContext} from "../../context/authContext"
import './story.scss';

const Story = () => {
    const {currentUser}=useContext(AuthContext);
    const stories=[
        {
            id:1,
            name:'Ani',
            image:"https://images.unsplash.com/photo-1686889251278-17a7253d0e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            id:2,
            name:'Ani',
            image:"https://images.unsplash.com/photo-1686889251278-17a7253d0e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            id:3,
            name:'Ani',
            image:"https://images.unsplash.com/photo-1686889251278-17a7253d0e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
        {
            id:4,
            name:'Ani',
            image:"https://images.unsplash.com/photo-1686889251278-17a7253d0e65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHx0b3BpYy1mZWVkfDF8NnNNVmpUTFNrZVF8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        },
    ]

  return (
    <div className='stories'>
        <div className="story">
            <img src={"/upload/"+currentUser.profilePic} alt="" />
            <span>{currentUser.name}</span>
            <button>+</button>
        </div>
        {stories.map(story=>
            <div className="story" key={story.id}>
                <img src={story.image} alt="" />
                <span>{story.name}</span>
            </div>
        )}
    </div>
  )
}

export default Story