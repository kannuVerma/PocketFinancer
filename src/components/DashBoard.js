import * as React from 'react';
import './DashBoard.css';

// import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
// import {AddNewTransaction} from './addnewtransaction'
// import {History} from './history'
import {Budget} from './budget'
//import {BudgetTracker} from './BudgetTracker'
import {ChartComponent} from './ChartComponent'

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