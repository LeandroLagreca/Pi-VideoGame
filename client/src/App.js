import './App.css';
import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import LandingPage from './componentes/LandingPage/LandingPage';
import Home from './componentes/Home/Home';
import VideoGameDetail from './componentes/VideoGameDetails/VideoGameDetails';
import CreateVideoGame from './componentes/CreatedVideoGame/CreatedVideoGame';
function App() {
  return (
    <>
    <BrowserRouter>
    <Switch>
      <Route exact path='/' component={LandingPage}/>
      <Route exact path ='/home'component={Home} />
      <Route exact path ='/videogame/:id'component={VideoGameDetail} />
      <Route exact path ='/createvideogame'component={CreateVideoGame} />
    </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
