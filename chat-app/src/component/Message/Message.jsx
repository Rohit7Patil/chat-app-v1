import React from 'react';
import './Message.css';

const Message = ({user, message, conditionalClass}) => {
    if(user){
        return (
            <div className={`${conditionalClass} messageBox`}>
                {`${user}: ${message}`}
            </div>
          )
    }
    else{
        return (
            <div className={`${conditionalClass} messageBox`}>
                {`You: ${message}`}
            </div>
          )
    }
  
}

export default Message