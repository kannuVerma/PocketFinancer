import React, { useState } from 'react';
import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'
import {History} from './history'
import {Budget} from './budget'
import {BudgetTracker} from './BudgetTracker'
import {ChartComponent} from './ChartComponent'
import user1 from '../images/girl1.png';
import user2 from '../images/boy.png';
import user3 from '../images/boy.jpeg';
import user4 from '../images/girl2.png';

// import { Card, CardActionArea, CardContent, CardMedia, Grid, Typography, makeStyles, Button } from '@material-ui/core';


//import '../App.css'

function Landing(props) {
  const [transactionSuccess, settransactionsuccess] = useState(undefined);
  const [deletedIdSuccess, setdeletedidsuccess] = useState(undefined);
  const [budgetSuccess, setbudgetsuccess] = useState(undefined);
  const [editSuccess,seteditSuccess ] = useState(undefined);
  const [deletebudgetSuccess,setdeletebudgetsuccess] = useState(undefined);
  const [details,setdetails] = useState(undefined);
  const [latestModified,setLatestModifiedRow] = useState(undefined);
  const [latestModifiedTrasaction,setLatestModifiedTransactionRow] = useState(undefined);
  
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
  const latestmodified = async(r) =>{
    setLatestModifiedRow(r);
  }
  const latestmodifiedtransaction = async(r) =>{
    setLatestModifiedTransactionRow(r);
  }
  function reload(e) {
    window.location.reload(false);
  }
 
  return (
        <div className="container">
          
          <ul id="landing-tabs" class="nav nav-tabs navbar-inverse">
            <li class="active"><a data-toggle="tab" onClick={reload.bind(this)} href="#home"><h3>DASHBOARD</h3></a></li>
            <li><a data-toggle="tab" href="#budget-div"><h3>BUDGET</h3></a></li>
            <li><a data-toggle="tab" href="#expense-div"><h3>EXPENSE</h3></a></li>
            <li><a data-toggle="tab" href="#help-div"><h3>HELP</h3></a></li>
            <li><a data-toggle="tab" href="#about-us-div"><h3>REVIEWS</h3></a></li>
            <li><a className='App-logout text-center' href='/login'><h3>LOGOUT</h3></a></li>
          </ul>
          <br/><br/>

          <div class="tab-content">
            <div id="home" class="tab-pane in active">
              <ChartComponent details = {details}/>
              <br/><br/>
              <div class="card-body">
                  <div class="card-text"> <Balance id = {props.match.params.id} editdetails = {editdetails} budgetSuccess = {budgetSuccess} deletebudgetSuccess = {deletebudgetSuccess} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess} editSuccess = {editSuccess} /></div>
                </div>
            </div>
            
            
            <div id="budget-div" class="tab-pane">
              <div class="card-body">
                <div class="card-text"><Budget id = {props.match.params.id} latestmodified = {latestmodified} budgetsuccess = {budgetsuccess} /></div>        
                <div class="card-body">
                <div class="card-body">
                  <div class="card-text"><BudgetTracker id = {props.match.params.id} budgetSuccess = {budgetSuccess} latestModified = {latestModified} deletesuccessbudget = {deletesuccessbudget} /></div>        
                </div>
                </div>
              </div>
            </div>
            
            <div id="expense-div" class="tab-pane">
              <div class="card-text"> <AddNewTransaction  id = {props.match.params.id} latestmodifiedtransaction = {latestmodifiedtransaction} transactionsuccess = {transactionsuccess}/> </div>
              <br/>
              <div class="card-body">
                <div class="card-text"> <History  id = {props.match.params.id} transactionSuccess = {transactionSuccess}  latestModifiedTrasaction = {latestModifiedTrasaction} deletesuccess  = {deletesuccess} editsuccess = {editsuccess} /> </div>
              </div>
            </div>

            <div id="help-div" class="tab-pane text-left">
                <h1>FAQs:</h1><br/>
                <h2 className="text-secondary">What does this platform does?</h2>
                <h3>PocketFinancer is an application where users can keep track of your spending habits.</h3>
                <br/>
                <h2 className="text-secondary">What does the Dashboard graph means?</h2>
                <h3>Dashboard shows the graph representation of your budget & expense data. For users having color blindness or difficult understanding, we display the information in table format as well.</h3>
                <br/>
                <h2 className="text-secondary">How it will help me manage my expenses?</h2>
                <h3>Every month you enter your budget details, and expenses associated with particular categories. We gather all information and shows the information in graphs & table format to make you understand where you money is going.</h3>
                <br/>
                <h2 className="text-secondary">How can I see/edit my budget?</h2>
                <h3>You can open tab 'Budget' and see your budget details for the month, and can add/delete items. We understand that your time is precious, so we have a 'Dashboard' where you can have a look of your budget in a glance, whenever you have time :)</h3>
                <br/>
                <h2 className="text-secondary">How can I see/edit my expenses?</h2>
                <h3>You can open tab 'Expense' and see your expense details for the month, and can add/modify/delete items. We understand that your time is precious, so we have a 'Dashboard' where you can have a look of your expenses in a glance, whenever you have time :)</h3>
                <br/>
            </div>

            <div id="about-us-div" class="tab-pane text-center">
                <br/>
                <h2>&nbsp;&nbsp;We value our customers! Read what they say :)</h2>
                <br/><br/>
                <div className="col-sm-5 col-md-8 col-lg-3">
                  <img alt='book' width="200" src={user1} className="rounded-circle border border-dark img-responsive" />
                  <br/>
                  <h3>Amy Jackson</h3><br/>
                  <div className="col-md-12"><h5>I always used to be broke by the month end time, PocketFinancer not only helped me sort out my expenses but also made me a responsible person, my parents are very proud of me now :)</h5></div>
                </div>
                
                <div className="col-sm-5 col-md-4 col-lg-3">
                  <img alt='book' width="210" src={user2} className="rounded-circle border border-dark img-responsive" />
                  <br/>
                  <h3>Christopher Brown</h3><br/>
                  <div className="col-md-12"><h5>PocketFinancer has a wonderful customer service. They take user feedback, and give them maximum satisfaction.</h5></div>
                </div>

                <div className="col-sm-5 col-md-4 col-lg-3">
                  <img alt='book' width="225" src={user3} className="rounded-circle border border-dark img-responsive" />
                  <br/>
                  <h3>Ajeesh Patel</h3><br/>
                  <div className="col-md-12"><h5>I access PocketFinancer during my break time, it gives me motivation lead to organized life. Cheers!!</h5></div>
                </div>
                <div className="col-sm-5 col-md-4 col-lg-3">
                  <img alt='book' width="230" src={user4} className="rounded-circle border border-dark img-responsive" />
                  <br/>
                  <h3>Jo Blythe</h3><br/>
                  <div className="col-md-12"><h5>My friends keep on asking me how I am organizing my expenses & life so well ;)</h5></div>
                </div>
                
            </div>

          </div>
          
          {/*<div class="card-deck">
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
                  <div class="card-text"> <Incompence id = {props.match.params.id} transactionSuccess = {transactionSuccess} deletedIdSuccess = {deletedIdSuccess} editSuccess = {editSuccess} budgetSuccess = {budgetSuccess} deletesuccessbudget = {deletesuccessbudget} /></div>
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
          </div>*/}
            
 		</div>
  );
}
export default Landing;