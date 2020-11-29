import * as React from 'react';
import './DashBoard.css';

import {ChartComponent} from './ChartComponent'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {Budget} from './budget'
// import {AddNewTransaction} from './addnewtransaction'
// import {History} from './history'
//import {BudgetTracker} from './BudgetTracker'


export function DashBoard() {
    return (
        <div className="panels">
            <div className="panel-info">
                <ChartComponent />
            </div>
            <div className="panel-allocation">
                <Budget />
            </div>
            <div className="panel-balance">
                <Balance />
            </div>
            <div className="panel-positions">
                <Incompence />
            </div>
            </div>
    );
}