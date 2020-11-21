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
    }).then(r => {console.log(r)
        if(r.status === 200){
            console.log("right credentials")
            window.location = "/landing"    
        }else if(r.status === 401){
            alert("Email or Password is wrong \n Please try again")
        }
      }).catch(e => console.log(e));
  }
	return (

    <form onSubmit = { handleSubmit }>  
    <input
      value={email}
      onChange={inputsEmail}
      placeholder="Email address"
      type="email"
      name="email"
      
    />
    <input
      value={password}
      onChange={inputsPassword}
      placeholder="Password"
      type="password"
      name="password"
      
    />
    <button type="submit">Submit</button>
  </form>

	);
};
export default LoginForm;


