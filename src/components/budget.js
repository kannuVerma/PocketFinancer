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
            props.latestmodified(addNewBudget);
          }
        })
    }

    return (        
    <div>
        
      <form onSubmit = {submit}>
        <div class="form-group row">
          <label class="col-sm-2 col-form-label"  for="amountid"><h5>Amount</h5> </label>
          <div class="col-sm-10">
          <input type="number" class="form-control" id="amountid" value = {amount} min="0" onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
          </div>
        </div>
        <div class="form-group row">
            <label class="col-sm-2 col-form-label" for="category"><h5>Category</h5></label>
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
        <br/>
        <button class="btn btn-outline-success my-2 my-sm-0" type="submit"><h4>Add Budget</h4></button>
      </form>
    </div>
    )
}