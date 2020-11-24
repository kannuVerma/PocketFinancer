import * as React from 'react';
import { Link } from "react-router-dom";

export function Nav() {
    return (
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Welcome to PocketFinancer</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link class="nav-link" href="/">Home <span class="sr-only">(current)</span></Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/Login">Login</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/budget">budget</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/balance">balance</Link>
            </li>
            <li class="nav-item">
              <Link class="nav-link" href="/BudgetTracker">BudgetTracker</Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
export default Nav;
  