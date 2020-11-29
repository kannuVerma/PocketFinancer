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
        body: JSON.stringify(user),
    }).then(r => {
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
    <h3>Sign Up</h3>
    <div className="form-group">
    <label>First name</label>
    <input
      className="form-control"
      value={firstName}
      onChange={inputsFirstname}
      placeholder="First name"
      type="text"
      name="firstName"
      
    />
    </div>
    <div className="form-group">
    <label>Last name</label>
    <input
      className="form-control"
      value={lastName}
      onChange={inputsLastname}
      placeholder="Last name"
      type="text"
      name="lastName"
      
    />
    </div>
    <div className="form-group">
    <label>Email address</label>
    <input
      className="form-control"
      value={email}
      onChange={inputsEmail}
      placeholder="Email address"
      type="email"
      name="email"
      
    />
    </div>
    <div className="form-group">
    <label>Email address</label>
    <input
      className="form-control"
      value={password}
      onChange={inputsPassword}
      placeholder="Password"
      type="password"
      name="password"
    />
    </div>
    <button type="submit" className="btn btn-primary btn-block">Sign Up</button>
    <p className="forgot-password text-right">
      Already registered? Click here to <a href="/Login">Login</a>
    </p>
  </form>

	);
};

export default SignupForm;


