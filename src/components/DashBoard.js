import * as React from 'react';

import {Header} from './header'
import {Balance} from './balance'
import {Incompence} from './incompence'
import {AddNewTransaction} from './addnewtransaction'
import {History} from './history'
import {Budget} from './budget'
import {BudgetTracker} from './BudgetTracker'
import {ChartComponent} from './ChartComponent'

export function DashBoard() {
    return (
        <div className="panels">
            <div className="panel-info">
                <Balance />
            </div>
            <div className="panel-allocation">
                <Budget />
            </div>
            <div className="panel-balance">
                <Incompence />
            </div>
            <div className="panel-positions">
                <AddNewTransaction />
            </div>
            </div>
    );
}