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
                props.editdetails(data);               
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.budgetSuccess, props.transactionSuccess,props.deletebudgetSuccess, props.deletedIdSuccess , props.editSuccess]
    )
    const diff = (a,b) =>{
        return b-a;
    }

    return (
    <div>
        <h5>Budget Metrics</h5>
        <table class="table table-bordered">
        <thead>
            <tr>
                <th scope="col">Amount</th>
                <th scope="col">Category</th>
                <th scope="col">Budget Amount</th>
                <th scope="col">Remaining Budget</th>
            </tr>
            </thead>
            <tbody>
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
        </tbody>
        </table>

    </div>
    )
}