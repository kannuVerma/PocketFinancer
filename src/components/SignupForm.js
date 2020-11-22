import React from 'react';
// import axios from "axios"; 
import { useState } from "react";

const SignupForm = (props) => {
  const [ firstName, setFirstName] = useState("");	
  const [lastName , setLastName] = useState("");
  const [email , setEmail] = useState("");
  const [password , setPassword] = useState("");
const inputsFirstname = (e) =>{
  setFirstName(  e.target.value )
}
const inputsLastname = (e) =>{
  setLastName(  e.target.value )
}
const inputsEmail = (e) =>{
  setEmail(  e.target.value )
}
const inputsPassword = (e) =>{
  setPassword(  e.target.value )
}

  const handleSubmit = (event) => {
    event.preventDefault();
    const user = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: password
    }
   
    // axios.post('localhost:4000/', { user }, {headers: {'content-type': 'application/json'}});
    // alert( user.email);
    fetch('http://localhost:4000/signup', {
        method: 'POST',
        headers: {
          "Content-type": "application/json",
          "Accept": "application/json",
          "Accept-Charset": "utf-8"
      },
      credentials: 'include',
        body: JSON.stringify(user),
    }).then(r => {console.log(r)
      if(r.status === 200){
        alert("Signup successfull");
        window.location = "/login"    
      }
      else if(r.status === 403){
        alert("Email already exists")
        window.location = "/signup"   
    }
    }).catch(e => {
      console.log(e);
      alert(e);

    });
  }
	return (

    <form onSubmit = { handleSubmit }>
    <input
      value={firstName}
      onChange={inputsFirstname}
      placeholder="First name"
      type="text"
      name="firstName"
      
    />
    <input
      value={lastName}
      onChange={inputsLastname}
      placeholder="Last name"
      type="text"
      name="lastName"
      
    />
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
    <a href='/login'>Click here to login</a>
  </form>

	);
};

export default SignupForm;


