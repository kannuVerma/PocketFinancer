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
    if(details.length > 0)
    {
    return (
    <div>
        <h2><b>Where your money goes?</b></h2><br/>
        <table class="table table-bordered table-striped">
        <thead className="thead-dark">
            <tr>
                <th scope="col">Category</th>
                <th scope="col">Budget</th>
                <th scope="col">Spent</th>
                <th scope="col">Remaining</th>
            </tr>
            </thead>
            <tbody>
            {details.map((trans,i) => {
                        return <tr> 
                                <td>
                                    <b>{trans.category}</b>
                                </td>
                                <td>
                                    {trans.budgetAmount}
                                </td>
                                <td>
                                    {trans.amount} 
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
    } else {
        return(
            <div>
                <p>No records available</p>
            </div>
        )
    }
}