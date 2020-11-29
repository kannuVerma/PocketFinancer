import React, {useState} from 'react'
import '../App.css';
export const Budget = (props) => {
    const [amount,setAmount] = useState(0);
    const [category, setCategory] = useState('Entertainment');

    const submit = e => {
        e.preventDefault();
        const addNewBudget = {
            amount: parseInt(amount),
            category : category,
            userId: props.id
        }
        fetch('http://localhost:4000/budget',{
          method:'POST',
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
          },
          //credentials: 'include',
          body: JSON.stringify(addNewBudget),
        }).then(r => {
          if(r.status === 200){
            props.budgetsuccess(r);
          }
        })
    }

    return (        
    <div>
        <h5>Budget</h5>
      <form onSubmit = {submit}>
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
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Add Budget Category</button>
      </form>
    </div>
    )
}