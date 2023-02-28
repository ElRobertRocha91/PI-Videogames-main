import './App.css';
//Me importo mi:
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from './components/landingPage/LandingPage';
import Home from './components/home/Home';
import Detail from './components/detail/Detail';
import Form from './components/form/Form';
import Error404 from './components/error404/Error404';

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/detail/:id' component={Detail}/>
        <Route path='/createVideogames' component={Form}/>
        <Route path='*' component={Error404}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
