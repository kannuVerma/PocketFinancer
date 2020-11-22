import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<Router>
    

	<div className='App'>
				<header className='App-header'>
					<h1 className='App-title'>Welcome to PocketFinancer</h1>					
				</header>
				<br />
				<br />
			<div className='App'>
				
        <Switch>
					<Route exact path='/' component={Login} />	
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/landing/:id' component={Landing} />
          </Switch>
			</div>
			</div>    
		</Router>
	);
};

export default App;

