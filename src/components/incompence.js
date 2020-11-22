/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import axios from 'axios'

export const Incompence = (props) => {
    const [expense,setExpense] = useState(0);
    useEffect(() =>{
        async function fetchData() {
            try {

                let id = props.id;
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
    [props.transactionSuccess, props.deletedIdSuccess]
    )

    return (
    <div>
        <div  class = "container1">        
            <h4>Expence</h4>
    <p className = 'expence-color'> {expense}</p>
        </div>

    </div>
    )
}