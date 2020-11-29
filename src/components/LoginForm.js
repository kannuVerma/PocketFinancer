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
      return response.json()
      
    })
    .then(data => {
      console.log(data)
      window.location = "/landing/" + data._id
    });
    /*.then(r => {
        console.log(r)
        if(r.status === 200){
            window.location = "/landing"    
        }else if(r.status === 401){
            alert("Email or Password is wrong \n Please try again")
        } 
      }).catch(e => console.log(e));*/
  }
	return (
<div className="login-wrapper">
        	<div className="login-inner">
    <form onSubmit = { handleSubmit }>  
    <h3>Sign In</h3>
    <div className="form-group">
    <label>Email address</label>
    <input
      className="form-control"
      value={email}
      onChange={inputsEmail}
      placeholder="Enter email"
      type="email"
      name="email"
      
    />
    </div>

    <div className="form-group">
    <label>Password</label>
    <input
      className="form-control"
      value={password}
      onChange={inputsPassword}
      placeholder="Enter Password"
      type="password"
      name="password"
      
    />
    </div>
    <button type="submit" className="btn btn-primary btn-block">Submit</button>


    <p className="dont-have-account text-right">
                    Don't have account? Click here to <a href='/signup'>signup</a>
                </p>
  </form>
</div>
</div>
	);
};
export default LoginForm;


