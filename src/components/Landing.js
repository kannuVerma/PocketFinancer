import React, { useState } from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'
import {History} from './history'
import {Budget} from './budget'
import {BudgetTracker} from './BudgetTracker'

import '../App.css'

function Landing(props) {
  const [transactionSuccess, settransactionsuccess] = useState(undefined);
  const [deletedIdSuccess, setdeletedidsuccess] = useState(undefined);
  const [budgetSuccess, setbudgetsuccess] = useState(undefined);
  const transactionsuccess = async(r) => {
    settransactionsuccess(r);
  }
  const deletesuccess = async(r) => {
    setdeletedidsuccess(r);
  }
  const budgetsuccess = async(r) => {
    setbudgetsuccess(r);
  }
 
  return (
        <div>
          <Header />
          <BudgetTracker id = {props.match.params.id} budgetSuccess = {budgetSuccess}/>
          <Budget id = {props.match.params.id} budgetsuccess = {budgetsuccess}/>
          <Balance id = {props.match.params.id}/>
          <Incompence id = {props.match.params.id} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess}/>
          <AddNewTransaction  id = {props.match.params.id} transactionsuccess = {transactionsuccess}/> 
          <History  id = {props.match.params.id} transactionSuccess = {transactionSuccess}  deletesuccess  = {deletesuccess} />
            <a href='/login'>Logout</a>
 		</div>
  );
}
export default Landing;