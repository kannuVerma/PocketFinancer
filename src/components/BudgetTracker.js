/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'


export const BudgetTracker = (props) => {
    const [budget,setbudget] = useState([]);
    const [del, setdel] = useState(undefined);
    const [latestModifiedRow, setLatestModifiedRow] = useState(undefined);

    useEffect(() =>{
        async function fetchData() {
            try {
                let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/budget/${id}`);
                setbudget(data.reverse());
                setLatestModifiedRow(props.latestModified);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.budgetSuccess, props.latestModified, del]
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
    if(budget.length > 0)
    {
    return (
    <div>
        <table class="table table-bordered table-striped">
        <thead className="thead-dark">
            <tr>
                <th><h5>Category</h5></th>
                <th><h5>Amount</h5></th>
                <th><h5>Delete</h5></th>
            </tr>
        </thead>
        <tbody>
            {budget.map((trans,i) => {
                        return latestModifiedRow != undefined && latestModifiedRow.category == trans.category && latestModifiedRow.amount == trans.amount?
                            <tr className="td-budget-highlight"> 
                                <td>
                                    <h5>{trans.category}</h5>
                                </td>
                                <td>
                                    {trans.amount}
                                </td>
                                <td>
                                    <button class="btn btn-link" style={{color: "red"}} onClick={() => deleteBudget(trans._id)} ><i class="fa fa-close"></i></button>
                                </td>
                            </tr>:<tr> 
                                <td>
                                    <h5>{trans.category}</h5>
                                </td>
                                <td>
                                    {trans.amount}
                                </td>
                                <td>
                                    <button class="btn btn-link" style={{color: "red"}} onClick={() => deleteBudget(trans._id)} ><i class="fa fa-close"></i></button>
                                </td>
                            </tr>
        })}
        </tbody>
        </table>

    </div>
    )
    }
    else {
        return(
            <div>
                <h5>Budget List</h5>
                <p>No records available</p>
            </div>
        )
    }
}