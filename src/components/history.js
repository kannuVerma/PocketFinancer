/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const History = (props) => {
    const [expense,setExpense] = useState([]);
    const [del, setdel] = useState(undefined);
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
    [props.transactionSuccess, del]
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

    return (
    <div>
        <h3>History</h3>
        {expense.map((trans,i) => {
                        return <li key={trans._id}>{trans.desc} <span>${trans.amount}</span><button onClick={() => deleteTransaction(trans._id)} >X</button></li>;
        })}
      

    </div>
    )
}