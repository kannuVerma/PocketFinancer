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
        <h3>Transaction History</h3>
        <table>
            <tr>
                <th>Expense</th>
                <th>Amount</th>
                <th>Category</th>
                <th>Date</th>
                <th>Delete</th>
            </tr>
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
                                    <button onClick={() => deleteTransaction(trans._id)} >X</button>
                                </td>
                            </tr>;
        })}
        </table>

    </div>
    )
}