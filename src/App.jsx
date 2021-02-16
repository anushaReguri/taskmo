import './App.css';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './pages/Login'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Employer from './pages/EmployerDashboard.jsx'
import User from './pages/UserDashboard.jsx'
import Header from './pages/Header.jsx'

function App() {
  
  const Routing = () => {
    const isLoggedin = JSON.parse(localStorage.getItem('isLoggedin'));
    if (!isLoggedin) return  <Route exact path='/' component={Login}></Route>
    return<div>
      <Header/>
        <Route  path='/employer' component={Employer}></Route>
   <Route exact path='/user' component={User}></Route>
   </div>
};

  return (
    <div className="App">
     <BrowserRouter>
     <Switch>
     <Routing />
     </Switch>
 </BrowserRouter>
    </div>
  );
}

export default App;
