/* eslint-disable no-unused-vars */
import React, { useState, useContext } from 'react'

export const AddNewTransaction = () => {
    const [expense,setExpense] = useState('');
    const [amount,setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');


    const submit = e => {
        e.preventDefault();

        const addNewTransaction = {
            expense,
            amount: parseInt(amount),
            category,
            date
        }
    }
    return (        
    <div>
        <h3>Add new transaction</h3>
      <form onSubmit = {submit}>
        <div>
          <label for="expense">Expense: </label>
          <input type="expense" value = {expense} onChange={(e) => setExpense(e.target.value)} placeholder="Enter Expense" />
        </div>
        <div>
          <label for="amount">Amount: </label>
          <input type="number" value = {amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
        </div>
        <div>
            <label for="category">Category:</label>
            <select value = {category} onChange={(e) => setCategory(e.target.value)} name="category">
                <option value="Entertainment">Entertainment</option>
                <option value="Food and Drinks">Food and Drinks</option>
                <option value="Home">Home</option>
                <option value="Utilities">Utilities</option>
                <option value="Transportation">Transportation</option>
                <option value="Life">Life</option>
                <option value="Other">Other</option>
            </select>
        </div>
        <div>
            <label for="date">Date:</label>
            <input type="date" value = {date} onChange={(e) => setDate(e.target.value)} name="date" />
        </div>
        <button>Add transaction</button>
      </form>
    </div>
    )
}