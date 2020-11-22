import React, { useState } from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'
import {History} from './history'

import '../App.css'

function Landing(props) {
  const [transactionSuccess, settransactionsuccess] = useState(undefined);
  const [deletedIdSuccess, setdeletedidsuccess] = useState(undefined);
  const transactionsuccess = async(r) => {
    settransactionsuccess(r);
  }
  const deletesuccess = async(r) => {
    setdeletedidsuccess(r);
  }
 
  return (
        <div>
          <Header />
          <Balance id = {props.match.params.id}/>
          <Incompence id = {props.match.params.id} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess}/>
          <AddNewTransaction  id = {props.match.params.id} transactionsuccess = {transactionsuccess}/> 
          <History  id = {props.match.params.id} transactionSuccess = {transactionSuccess}  deletesuccess  = {deletesuccess} />
            <a href='/login'>Logout</a>
 		</div>
  );
}
export default Landing;