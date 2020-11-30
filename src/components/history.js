/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal';
const customStyles = {
    content : {
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
      position: 'absolute'
    },
    Overlay: {
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        position: 'fixed'
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
            setExpense1('')
            setCategory('Entertainment')
            setAmount(0)
            setDate('')
          }
        })

    }

    return ( 
    <div>
        <h5>Transaction History</h5>
        <table class="table table-bordered">
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
                                <button type="button" class="close"  onClick={() => editTransaction(trans._id)}  ><i class="fas fa-edit"></i> </button>
                                    <Modal isOpen={modalIsOpen} onAfterOpen={afterOpenModal} onRequestClose={closeModal} style={customStyles} contentLabel="Example Modal">
                                    <button type="button" class="close" style={{color: "red"}}  onClick={closeModal} >
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                    <br></br><br></br><br></br>
                                        <form onSubmit = {submit}>
                                            <div class="form-group row">
                                            <label  class="col-sm-2 col-form-label" for="expense">Expense </label>
                                            <div class="col-sm-10">
                                                <input class="form-control" type="expense" value = {expense1} onChange={(e) => setExpense1(e.target.value)} placeholder="Enter Expense" />
                                            </div>
                                            </div>
                                            <div class="form-group row">
                                            <label   class="col-sm-2 col-form-label" for="amount">Amount </label>
                                            <div class="col-sm-10">
                                            <input class="form-control" type="number" value = {amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" />
                                            </div>
                                            </div>
                                            <div class="form-group row">
                                                <label  class="col-sm-2 col-form-label" for="category">Category</label>
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
                                                <label  class="col-sm-2 col-form-label" for="date">Date</label>
                                                <div class="col-sm-10">
                                                <input class="form-control" type="date" value = {date} onChange={(e) => setDate(e.target.value)} name="date" />
                                            </div>
                                            </div>
                                            <button class="btn btn-outline-success my-2 my-sm-0" >Update</button>
                                        </form>
                                       
                                    </Modal>
                                </td>
                                <td>
                                    <button class="btn btn-link" style={{color: "red"}} onClick={() => deleteTransaction(trans._id)} ><i class="fa fa-close"></i></button>
                                </td>
                            </tr>;
        })}
        </tbody> 
        </table>
    </div>
    )
}