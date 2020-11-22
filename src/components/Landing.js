import React from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'

import '../App.css'

function Landing(props) {
  console.log("Props in landing: " + props)
  return (
        <div>
          <Header />
          <Balance />
          <Incompence />
          <AddNewTransaction  id = {props.match.params.id}> </AddNewTransaction>/>
      
            <a href='/login'>Logout</a>
 		</div>
  );
}
export default Landing;