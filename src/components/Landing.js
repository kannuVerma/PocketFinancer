import React from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'

import '../App.css'

function Landing() {
  return (
        <div>
          <Header />
          <Balance />
          <Incompence />
          <AddNewTransaction />
      
            <a href='/login'>Logout</a>
 		</div>
  );
}
export default Landing;