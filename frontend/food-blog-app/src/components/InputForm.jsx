import React from 'react'
import axios from 'axios';

export default function InputForm({setIsOpen}) {

    const [username, setUsername] = React.useState('');
    const [email, setEmail] = React.useState('');  
    const [password, setPassword] = React.useState('');

    const [isSignUp, setIsSignUp] = React.useState(false);
    const [error, setError] = React.useState('');

    const handelOnSubmit = async (e) => {
        e.preventDefault();
        let endpoint = isSignUp ? 'signup' : 'login';
        let data = {
            ...(isSignUp && {username}), // Only include username if signing up
            email,
            password
        };
        await axios.post(`http://localhost:5000/${endpoint}`, data)
            .then(response => {
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                setIsOpen();
            })
            .catch(error => {
                setError(error.response ? error.response.data.message : 'Something went wrong!');
            });
    };

  return (
    <>
    <form onSubmit={handelOnSubmit} className="form">
        {isSignUp &&
        <div className="form-control">
            <label htmlFor="Username">Username</label>
            <input type="text" id="username"  onChange={(e) => setUsername(e.target.value)} className='input' required/>
        </div>
    }
        <div className="form-control">
            <label htmlFor="Email">Email</label>
            <input type="email" id="email" className='input' onChange={(e) => setEmail(e.target.value)} required/>
        </div>

        <div className="form-control">
            <label htmlFor="Password">Password</label>
            <input type="password" id="password" className='input' onChange={(e) => setPassword(e.target.value)} required/>
        </div>
        <button type="submit">{(isSignUp) ? "Sign Up" : "Login"}</button>
        <br />
        {error != "" && <h6 className='error'>{error}</h6>} <br />
        <p onClick={() => setIsSignUp(pre => !pre)}>{isSignUp ? "Already have an account?" : "Create an Account"}</p>
    </form>
    </>
  )
}
