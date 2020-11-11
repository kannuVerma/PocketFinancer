import React from 'react';
import LoginForm from './LoginForm'

function Login() {
  
  return (
        <div>
           
 			<LoginForm />
             <p>Don't have an account></p>
             <a href='/signup'>Click here to signup</a>
 		</div>
  );
}
export default Login;