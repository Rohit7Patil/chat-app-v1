import './Welcome.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

let user;

const sendUser = () => {
  user = document.getElementById('welcomeInput').value;
  document.getElementById('welcomeInput').value = '';
};

const Welcome = () => {

  const [name, setName] = useState("");

  return (
    <div className='WelcomePage'>
      <div className='WelcomeContainer'>
        <h1>Welcome to Chat App</h1>
        <input onChange={(event) => setName(event.target.value)} type='text' id='welcomeInput' placeholder='Username' />
        <Link onClick={(event) => !name ? event.preventDefault() : null} to='/chat'>
          <button onClick={sendUser} className='welcomeBtn'>
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
export { user };
