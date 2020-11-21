import React, { useState } from 'react'
export const AddNewTransaction = () => {
    const [expense,setExpense] = useState('');
    const [amount,setAmount] = useState(0);
    return (        
    <div>
        <h3>Add new transaction</h3>
      <form id="form">
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
            <select id="category" name="category">
                <option value="Salary">Salary</option>
                <option value="Groceries">Groceries</option>
                <option value="Rent">Rent</option>
                <option value="Entertainment">Entertainment</option>
            </select>
        </div>
        <div>
            <label for="date">Date:</label>
            <input type="date" id="date" name="date" />
        </div>
        <button>Add transaction</button>
      </form>
    </div>
    )
}