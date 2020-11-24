/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const Balance = (props) => {
    const [details,setdetails] = useState([]);
    useEffect(() =>{
        async function fetchData() {
            try {
                let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/dashboard/${id}`);
                setdetails(data);
                
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.budgetSuccess, props.transactionSuccess,props.deletebudgetSuccess]
    )
    const diff = (a,b) =>{
        return b-a;
    }

    return (
    <div>
        <h3>Differences</h3>
        <table>
            <tr>
                <th>Amount</th>
                <th>Category</th>
                <th>Budget Amount</th>
                <th>Difference</th>
            </tr>
            {details.map((trans,i) => {
                        return <tr> 
                                <td>
                                    {trans.amount} 
                                </td>
                                <td>
                                    {trans.category}
                                </td>
                                <td>
                                    {trans.budgetAmount}
                                </td>
                                <td>
                                    {diff(trans.amount,trans.budgetAmount)}
                                </td>
                            </tr>;
        })}
        </table>

    </div>
    )
}
