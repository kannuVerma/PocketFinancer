import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';
import Nav from './components/Nav';
import Balance from './components/balance';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

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
		<Nav />	
        <Switch>
					{/* <Route exact path='/' component={Login} />	 */}
					<Route path="/"><Home /></Route>	
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
		<h1>balance</h1>
		<Balance />
	  </div>
	)
  }

export default App;

