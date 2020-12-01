import React from 'react';
import { useState } from "react";

const LoginForm = (props) => {
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");

const inputsEmail = (e) =>{
  setEmail(  e.target.value )
}
const inputsPassword = (e) =>{
  setPassword(  e.target.value )
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const credentials = {
      email: email,
      password: password
    }
 
    fetch('http://localhost:4000/login', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Accept-Charset": "utf-8"
      },
    
        body: JSON.stringify(credentials),
    }).then(response => {
    //   if(response.status === 200){
    //     window.location = "/landing"    
    // }
     if(response.status === 401){
        alert("Email or Password is wrong \nPlease try again")
    } else{
      return response.json()
      // window.location = "/landing/" + response.json()._id
    }
          
    })
    .then(data => {
      if(data._id === undefined){
        alert("Email or Password is wrong \nPlease try again")
        return
      }
      window.location = "/landing/" + data._id
    }).catch(e => console.log(e));;
    // .then(r => {
    //     console.log(r)
    //     if(r.status === 200){
    //         window.location = "/landing"    
    //     }else if(r.status === 401){
    //         alert("Email or Password is wrong \n Please try again")
    //     } 
    //   })
  }
	return (
    <div className="auth-wrapper">
    <div className="auth-inner">
    <div className='overlay'></div>
    <div className='auth-content'>
    <form onSubmit = { handleSubmit }>  
    <div className='welcome'>Welcome to PocketFinancer</div>
    <div class='subtitle'>Balancing your money is the key to having enough.</div>
    {/* <h3>Sign In</h3> */}
    <div className="input-fields">
    {/* <label>Email address</label> */}
    <input
      className="input-line full-width"
      value={email}
      onChange={inputsEmail}
      placeholder="Enter email"
      type="email"
      name="email"
      
    />
    
    {/* <label>Password</label> */}
    <input
      className="input-line full-width"
      value={password}
      onChange={inputsPassword}
      placeholder="Enter Password"
      type="password"
      name="password"
      
    />
    <div>
    <button className='ghost-round full-width' type="submit">Login</button>
    </div>
    </div>
    <div className='spacing'>Don't have account? Click here to <a className='highlight' href='/signup'>signup</a></div>
    {/* <div>
    <button className='ghost-round full-width' type="submit">Login</button>
    </div> */}

    {/* <p className="dont-have-account text-right">
                    Don't have account? Click here to <a href='/signup'>signup</a>
                </p> */}
  </form>
  </div>
</div>
</div>
	);
};
export default LoginForm;


