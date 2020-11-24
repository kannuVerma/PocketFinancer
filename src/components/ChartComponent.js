/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from 'react'

import DonutChart from 'react-donut-chart';
import { Chart } from "react-google-charts";


export const ChartComponent = (props) => {
    const [expenseData,setexpenseData] = useState([]);
    const [budgetData,setbudgetData] = useState([]);
    const [barchartData, setbarchartData] = useState([]);
    
   
    useEffect(() =>{
        async function fetchData() {
            try {
                console.log(props.details)
                const edata = props.details.map( detail =>{
                    return {
                        label : detail.category,
                        value : detail.amount
                    }
                }) 
                setexpenseData(edata);
                const bdata = props.details.map( detail =>{
                    return {
                        label : detail.category,
                        value : detail.budgetAmount
                    }
                }) 
                setbudgetData(bdata);
                let bcdata = props.details.map( detail =>{
                    return [
                        detail.category,
                        detail.amount,
                        detail.budgetAmount,
                        detail.budgetAmount - detail.amount

                    ]
                        
                    
                }) 
                bcdata.unshift(['Category', 'Expense', 'Budget', 'Remaining budget'])
                setbarchartData(bcdata);
            } catch (e) {
                console.log(e);
            }
        }
        fetchData();
    },
    [props.details]
    )
    const diff = (a,b) =>{
        return b-a;
    }

    return (
        <div>
            <br/>
            <p> Expense Data</p>
            <DonutChart data={expenseData} /> 
            <br/>
            <p> Budget Data</p>
            <DonutChart data={budgetData} />  


            <Chart
                width={'500px'}
                height={'300px'}
                chartType="Bar"
                loader={<div>Loading Chart</div>}
                data={barchartData}
                options={{
                 // Material design options
                     chart: {
                            title: 'Monthly Spending Habbits',
                            subtitle: 'Expense, Budget, and Remaining budge for the current month',
                            },
                    }} 
            />  
        </div>   
        
        

    )
}