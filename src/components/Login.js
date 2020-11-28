import React from 'react';
import LoginForm from './LoginForm'

function Login() {
  
  return (
        <div>
           
 			<LoginForm />
                <p className="dont-have-account text-right">
                    Don't have account? Click here to <a href='/signup'>signup</a>
                </p>
 		</div>
  );
}
export default Login;