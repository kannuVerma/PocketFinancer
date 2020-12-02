import React from 'react';
// import axios from "axios"; 
import { useState } from "react";
import icon from '../images/pocket-image.jpg';

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

    <div className="auth-wrapper">
    <div className="auth-inner">
    <div className='overlay'></div>
    <div className='auth-content'>
    <form onSubmit = { handleSubmit }>
    <br/><br/>
    
    <div className="col-sm-3 col-md-3 col-lg-3"></div>
    <div id="welcome-logo-text">
      <div className='welcome'>Welcome to PocketFinancer</div>
      &nbsp;&nbsp;&nbsp;<img alt='book' src={icon} width="100" height="100" className="rounded-circle border border-dark img-responsive" />
    </div>
    <br/>

    <div class='subtitle'>Balancing your money is the key to having enough</div>
    <div className="input-fields">
    {/* <label>First name</label> */}
    <input
      className="input-line full-width"
      value={firstName}
      onChange={inputsFirstname}
      placeholder="First name"
      type="text"
      name="firstName"
      
    />
    
    {/* <label>Last name</label> */}
    <input
      className="input-line full-width"
      value={lastName}
      onChange={inputsLastname}
      placeholder="Last name"
      type="text"
      name="lastName"
      
    />
    
    {/* <label>Email address</label> */}
    <input
      className="input-line full-width"
      value={email}
      onChange={inputsEmail}
      placeholder="Email address"
      type="email"
      name="email"
      
    />
   
    {/* <label>Email address</label> */}
    <input
      className="input-line full-width"
      value={password}
      onChange={inputsPassword}
      placeholder="Password"
      type="password"
      name="password"
    />
    <div>
    <button className="ghost-round full-width" type="submit">Sign Up</button>
    </div>
    </div>
    <div className='spacing'>Already registered? Click here to <a className='highlight' href='/Login'>Login</a></div>
    {/* <div>
    <button className="ghost-round full-width" type="submit">Sign Up</button>
    </div> */}
    {/* <p className="dont-have-account text-right">
      Already registered? Click here to <a href="/Login">Login</a>
    </p> */}
  </form>
  </div>
  </div>
  </div>

	);
};

export default SignupForm;


