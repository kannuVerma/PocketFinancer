import React, { useState } from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'
import {History} from './history'
import {Budget} from './budget'
import {BudgetTracker} from './BudgetTracker'
import {ChartComponent} from './ChartComponent'


//import '../App.css'

function Landing(props) {
  const [transactionSuccess, settransactionsuccess] = useState(undefined);
  const [deletedIdSuccess, setdeletedidsuccess] = useState(undefined);
  const [budgetSuccess, setbudgetsuccess] = useState(undefined);
  const [editSuccess,seteditSuccess ] = useState(undefined);
  const [deletebudgetSuccess,setdeletebudgetsuccess] = useState(undefined);
  const [details,setdetails] = useState(undefined);
  const transactionsuccess = async(r) => {
    settransactionsuccess(r);
  }
  const deletesuccess = async(r) => {
    setdeletedidsuccess(r);
  }
  const budgetsuccess = async(r) => {
    setbudgetsuccess(r);
  }
  const deletesuccessbudget = async(r) =>{
    setdeletebudgetsuccess(r);
  }
  const editsuccess = async(r) => {
    seteditSuccess(r);
  }
  const editdetails = async(r) => {
    setdetails(r);
  }

 
  return (
        <div>
          <Header />

          <div className='App-logout'> <a className='App-logout' href='/login'>Logout</a>	</div>
          <div class="card-deck">
            <div class="card">
              <div class="card-body">
                <div class="card-text"><Budget id = {props.match.params.id} budgetsuccess = {budgetsuccess} /></div>        
              </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-text"> <AddNewTransaction  id = {props.match.params.id} transactionsuccess = {transactionsuccess}/> </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-text"> <Incompence id = {props.match.params.id} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess} editSuccess = {editSuccess}/></div>
                </div>
              </div>
            </div>
            <div class="card-deck">
            <div class="card">
              <div class="card-body">
                <div class="card-text"><BudgetTracker id = {props.match.params.id} budgetSuccess = {budgetSuccess} deletesuccessbudget = {deletesuccessbudget} /></div>        
              </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-text"> <History  id = {props.match.params.id} transactionSuccess = {transactionSuccess}  deletesuccess  = {deletesuccess} editsuccess = {editsuccess} /> </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-text"> <Balance id = {props.match.params.id} editdetails = {editdetails} budgetSuccess = {budgetSuccess} deletebudgetSuccess = {deletebudgetSuccess} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess} editSuccess = {editSuccess} /></div>
                </div>
              </div>
            </div>

          <ChartComponent details = {details}/>
          
            
 		</div>
  );
}
export default Landing;