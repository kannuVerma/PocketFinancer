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
            <input type="date" id="date" name="date" />
        </div>
        <button>Add transaction</button>
      </form>
    </div>
    )
}