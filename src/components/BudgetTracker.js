/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const BudgetTracker = (props) => {
    const [budget,setbudget] = useState([]);
    const [del, setdel] = useState(undefined);
    useEffect(() =>{
        async function fetchData() {
            try {
                let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/budget/${id}`);
                setbudget(data);
                
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.budgetSuccess, del]
    )
    
    const deleteBudget = async(transid) => {
        try {
            let id = props.id;
            const deletedid = await axios.delete(`http://localhost:4000/budget`, 
                {data: {
                    userId : id,
                    budgetId : transid
                }}
            )
            setdel(deletedid);
            props.deletesuccessbudget(deletedid);
        } catch(e){
            console.log(e);
        }
    }

    return (
    <div>
        <h5>Budget List</h5>
        <table>
            <tr>
                <th>Category</th>
                <th>Amount</th>
            </tr>
            {budget.map((trans,i) => {
                        return <tr> 
                                <td>
                                    {trans.category} 
                                </td>
                                <td>
                                    {trans.amount}
                                </td>
                                <td>
                                    <button onClick={() => deleteBudget(trans._id)} >X</button>
                                </td>
                            </tr>;
        })}
        </table>

    </div>
    )
}