/* eslint-disable react-hooks/exhaustive-deps */
import React, {  useEffect, useState } from 'react'

import DonutChart from 'react-donut-chart';
import { Chart } from "react-google-charts";
import '../charts.css'

export const ChartComponent = (props) => {
    const [expenseData,setexpenseData] = useState([]);
    const [budgetData,setbudgetData] = useState([]);
    const [barchartData, setbarchartData] = useState([]);
    
   
    useEffect(() =>{
        async function fetchData() {
            try {
                // console.log(props.details)
                let edata = props.details.map( detail =>{
                    return [  detail.category,
                        detail.amount]               
                }) 
               edata.unshift(["expesne", "expense amount"])
                setexpenseData(edata);
                const bdata = props.details.map( detail =>{
                    return [ detail.category, detail.budgetAmount ]
                    
                }) 
                bdata.unshift(["budget", "budge amount"])
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
    const options = {

        
        pieHole: 0.4,
        is3D: true,
        legend: {position: 'bottom'},
        

      };
     
    return (
        <div>
            <div class="card-deck">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Budget Data</h5>
                        <div class="card-text">
                            <Chart
                                chartType="PieChart"
                                width="100%"
                                height="400px"
                                data={budgetData}
                                options={options}
                            />
                        </div>
                    </div>        
              </div>
              
              <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Expense Data</h5>
                    <div class="card-text"> <Chart
                                chartType="PieChart"
                                width="100%"
                                height="400px"
                                data={expenseData}
                                
                                options={options}
                            /> </div>
                </div>
              </div>
              <div class="card">
                <div class="card-body">
                  <div class="card-text"> 
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
                </div>
              </div>
            </div>
            
         </div>   
        
        

    )
}