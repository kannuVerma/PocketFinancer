import React from 'react';
// import axios from "axios"; 
import { useState } from "react";

const Logout = (props) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    
 
    fetch('http://localhost:4000/logout', {
        //not sure
    }).then(r => {console.log(r)
        if(r.status === 200){
            console.log("right credentials")
            window.location = "/login"    
        }else if(r.status === 401){
            alert("Something went wrong")
        }
      }).catch(e => console.log(e));
  }
	return (

    <form onSubmit = { handleSubmit }>  
    <button type="submit">Submit</button>
  </form>

	);
};
export default Logout;