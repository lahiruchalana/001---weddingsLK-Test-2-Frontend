import React from 'react';
// import { BrowserRouter as Router } from 'react-router-dom'
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { DataProvider } from './GlobalState'
import HeaderDev from './components/headers/Header'
import Header from './components/header/Header';
import MainPages from './components/mainpages/Pages'
import Home from './components/home/Home.js';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/home">
          <Header />
          <Home />
        </Route>
        {/* <Route path="/home">
          <Header />
          <Home />
        </Route> */}
        <DataProvider>
          <Route path="/">
            {/* <Header /> */}
            <div className="App">
              <HeaderDev />
              <MainPages />
            </div>
          </Route>
        </DataProvider>
      </Switch>
    </Router>
  );
}

export default App;
