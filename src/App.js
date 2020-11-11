import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Landing from './components/Landing';


import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<Router>
    
			<div className='App'>
				
        <Switch>
					<Route exact path='/' component={Login} />	
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/landing' component={Landing} />
          </Switch>
			
			</div>    
		</Router>
	);
};

export default App;

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
