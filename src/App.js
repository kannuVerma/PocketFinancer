import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';

import { DashBoard } from './components/DashBoard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Balance } from './components/balance';
import { Budget } from './components/budget';
import { BudgetTracker } from './components/BudgetTracker';
import { History } from './components/history';
import { ChartComponent } from './components/ChartComponent';
import { AddNewTransaction } from './components/addnewtransaction';
import { Incompence } from './components/incompence';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
	<Router>
		<div className='App'>
			{/* <header className='App-header'>
				<h1 className='App-title'>
					Welcome to PocketFinancer
				</h1>	
					
				
			</header> */}
			<br />
			<br />
			<div className='App'>
			
        	<Switch>
					
					{/* <Route exact path='/' component={Login} />	 */}
					<Route exact path="/" component={Login}/>
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/landing/:id' component={Landing} />
					<Route exact path="/ChartComponent" component={ChartComponent} />
					<Route exact path="/History" component={History} />
					<Route exact path="/addnewtransaction" component={AddNewTransaction} />
					<Route exact path="/incompence" component={Incompence} />
					<Route exact path="/Budget" component={Budget} />
					<Route exact path="/BudgetTracker" component={BudgetTracker} />
					<Route exact path="/Balance" component={Balance} />
            </Switch>
			
			</div>
			</div>    
		</Router>
	);
};

export default App;

