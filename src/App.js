import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';


import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

const App = () => {
	return (
		<Router>
    

	<div className='App'>
				<header className='App-header'>
					{/* <img src={logo} className='App-logo' alt='logo' /> */}
					<h1 className='App-title'>Welcome to PocketFinancer</h1>
					{/* <Link className='marvellink' to='/'>
						Home
					</Link> */}
					{/* <Link className='marvellink' to='/characters/page/0'>
						Characters
					</Link>
          <Link className='marvellink' to='/budge'>
						Comics
					</Link>
          <Link className='marvellink' to='/series/page/0'>
						Series
					</Link> */}
				</header>
				<br />
				<br />
			<div className='App'>
				
        <Switch>
					<Route exact path='/' component={Login} />	
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/landing' component={Landing} />
          </Switch>
			</div>
			</div>    
		</Router>
	);
};

export default App;

