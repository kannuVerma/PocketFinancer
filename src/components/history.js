/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
const customStyles = {
    content : {
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)'
    }
  };


export const History = (props) => {
    const [expense1,setExpense1] = useState('');
    const [amount,setAmount] = useState(0);
    const [category, setCategory] = useState('Entertainment');
    const [date, setDate] = useState('');
    const [expense,setExpense] = useState([]);
    const [edit,setedit] = useState({});
    const [modalIsOpen,setIsOpen] = useState(false);
    const [del, setdel] = useState(undefined);
    const [edit1,setedit1] = useState(undefined);
    useEffect(() =>{
        async function fetchData() {
            try {
                let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/expense/${id}`);
                setExpense(data);
                
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.transactionSuccess, del,edit1]
    )
    const deleteTransaction = async(transid) => {
        try {
            let id = props.id;
            const deletedid = await axios.delete(`http://localhost:4000/expense`, 
                {data: {
                    userId : id,
                    expenseId : transid
                }}
            )
            setdel(deletedid);
            props.deletesuccess(deletedid);
        } catch(e){
            console.log(e);
        }
    }
    
 
    const afterOpenModal = () => {
    }
 
    function closeModal(){
        setIsOpen(false);
    }
 
    const editTransaction = async(transid) => {
        try {
            
            let expenseid = transid;
            const {data} = await axios.get(`http://localhost:4000/expense/expense/${expenseid}`);
            setedit(data);
            setIsOpen(true);
        } catch(e){
            console.log(e);
        }
    }
    const submit = e => {
        e.preventDefault();
        const addNewTransaction = {
            desc : expense1,
            amount: parseInt(amount),
            category : category,
            date : date,
            id: edit._id
        }
        fetch('http://localhost:4000/expense',{
          method:'PATCH',
          headers: {
            "Content-type": "application/json",
            "Accept": "application/json",
            "Accept-Charset": "utf-8"
          },
          //credentials: 'include',
          body: JSON.stringify(addNewTransaction),
        }).then(r => {
          if(r.status === 200){
            setedit1(r)
            props.editsuccess(r);
            setIsOpen(false)
          }
        })

    }

    return (
    <div>
        <h5>Transaction History</h5>
        <table class="table table-striped">
        <thead>
            <tr>
                <th>Expense</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Edit</th>
                <th>Delete</th>
            </tr>
        </thead>
        <tbody>
            {expense.map((trans,i) => {
                        return <tr> 
                                <td>
                                    {trans.desc} 
                                </td>
                                <td>
                                    {trans.amount}
                                </td>
                                <td>
                                    {trans.category}    
                                </td>
                                <td>
                                    {trans.date}    
                                </td>
                                <td>
                                    <button id="myBtn" onClick={() => editTransaction(trans._id)} >Edit</button>
                                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                                        
                                        <form onSubmit = {submit}>
                                            <div>
                                            <label for="expense">Expense: </label>
                                            <input type="expense" value = {expense1} onChange={(e) => setExpense1(e.target.value)} placeholder="Enter Expense" />
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
                                            <button>Update</button>
                                        </form>
                                        <button onClick={closeModal}>X</button>
                                    </Modal>
                                </td>
                                <td>
                                    <button onClick={() => deleteTransaction(trans._id)} >X</button>
                                </td>
                            </tr>;
        })}
        </tbody> 
        </table>
    </div>
    )
}