/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'
import $ from 'jquery';

var today = new Date(),

date1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

export const AddNewTransaction = (props) => {
    const [expense,setExpense] = useState('');
    const [amount,setAmount] = useState(0);
    const [category, setCategory] = useState('Entertainment');
    const [date, setDate] = useState(date1);

    const submit = e => {
        
        e.preventDefault();
        const addNewTransaction = {
            desc : expense,
            amount: parseInt(amount),
            category : category,
            date : date,
            userId: props.id
        } 
        fetch('http://localhost:4000/expense',{
          method:'POST',
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
          },
          //credentials: 'include',
          body: JSON.stringify(addNewTransaction),
        }).then(r => {
          if(r.status === 200){
            props.transactionsuccess(r);
            setExpense('')
            setAmount(0)
            setCategory('Entertainment')
            setDate(date1)
          }
        })

    }
    return (        
    <div>
        <h5> Transaction</h5>
      <form onSubmit = {submit}>
        <div class="form-group row">  
          <label class="col-sm-2 col-form-label" for="expense">Title </label>
          <div class="col-sm-10">
            <input class="form-control" type="expense" value = {expense} onChange={(e) => setExpense(e.target.value)} placeholder="Enter Expense" />
            </div>
          </div>
        <div class="form-group row">
          <label  class="col-sm-2 col-form-label" for="amount">Amount </label>
          <div class="col-sm-10">
          <input class="form-control" type="number" value = {amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
        </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="category">Category </label>
            <div class="col-sm-10">
              <select class="form-control" value = {category} onChange={(e) => setCategory(e.target.value)} name="category">
                <option value="Entertainment">Entertainment</option>
                <option value="Food and Drinks">Food and Drinks</option>
                <option value="Home">Home</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Life">Life</option>
                <option value="Other">Other</option>
            </select>
            </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="date">Date </label>
            <div class="col-sm-10">
            <input class="form-control" type="date" value = {date} onChange={(e) => setDate(e.target.value)} name="date" />
          </div>
          </div>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Add transaction</button>
      </form>
    </div>
    )
}