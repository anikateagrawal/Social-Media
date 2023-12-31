import React from 'react';
import moment from 'moment';

const Comment = ({comment}) => {
  return (
    <div className="comment" >
        <img src={"/upload/"+comment.profilePic} alt="" />
        <div className="info">
            <span>{comment.name}</span>
            <p>{comment.desc}</p>
        </div>
        <span className='date'>{moment(comment.createdAt).fromNow()}</span>
    </div>
  )
}

export default Comment