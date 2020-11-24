import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import { HomeNav } from './components/HomeNav';
import { Balance } from './components/balance';
import { Budget } from './components/budget';
import { BudgetTracker } from './components/BudgetTracker';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as React from 'react';



const App = () => {
	return (
		<Router>
    

	{/* <div className='App'>
				<header className='App-header'>
					<h1 className='App-title'>Welcome to PocketFinancer</h1>					
				</header>
				<br />
				<br />
			<div className='App'>
		<div> */}
		<div>
		<HomeNav />	
        <Switch>
					{/* <Route exact path='/' component={Login} />	 */}
					<Route exact path="/"><Home /></Route>	
					<Route exact path="/Budget" component={Budget} />
					<Route exact path="/BudgetTracker" component={BudgetTracker} />
					<Route exact path="/Balance" component={Balance} />			
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/landing/:id' component={Landing} />
        </Switch>
		</div>    
		</Router>
	);
};
function Home() {
	return (
	  <div>
		<h1>Balance</h1>
		<Balance />
		<h1>Budget</h1>
		<Budget />
		<h1>BudgetTracker</h1>
		<BudgetTracker />
	  </div>
	)
  }

export default App;

