import * as React from 'react';


export function Navbar() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <a class="navbar-brand" href="/DashBoard">Home</a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
            {/* <a class="nav-item nav-link" href="/budget">Budget</a>
            <a class="nav-item nav-link" href="/balance">Balance</a> */}
            <a class="nav-item nav-link" href="/BudgetTracker">BudgetTracker</a>
            {/* <a class="nav-item nav-link" href="/ChartComponent">Chart</a> */}
            <a class="nav-item nav-link" href="/history">History</a>
            <a class="nav-item nav-link" href="/addnewtransaction">Add Transactions</a>
            {/* <a class="nav-item nav-link" href="/incompence">Incompence</a> */}
            </div>
        </div>
                <a className="nav-link" href='/Login'>Login</a>
        </nav>
    );
  }
