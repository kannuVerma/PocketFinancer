/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Incompence = (props) => {
    const [expense,setExpense] = useState(0);
    const [budget, setBudget] = useState(0);
    const id = props.id;
    useEffect(() =>{
        async function fetchData() {
            try {

                // let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/expense/${id}`);
                const amount = data.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.amount;
                  }, 0);
                setExpense(amount);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.transactionSuccess, props.deletedIdSuccess , props.editSuccess]
    )

    useEffect(() =>{
        async function fetchdata() {
            try {

                // let id = props.id;
                const { data } = await axios.get(`http://localhost:4000/budget/${id}`);
                const budgetAmount = data.reduce(function(accumulator, currentValue) {
                    return accumulator + currentValue.amount;
                  }, 0);
                setBudget(budgetAmount);
            } catch (e) {
                console.log(e);
            }
        }
        fetchdata();
    },
    [props.budgetSuccess, props.deletesuccessbudget]
    )

    return (
    <div>
        <div  class = "container1">
            <br />        
            <h4>Expense</h4>
            <p className = 'expence-color'>${expense}</p>
            <br />
            <h4>Budget</h4>
            <p className = 'budget-color'>${budget}</p>
        </div>

    </div>
    )
}