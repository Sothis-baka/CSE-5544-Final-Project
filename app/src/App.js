import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";

import Home from './pages/Home';
import Visual1 from "./pages/Visual1";
import Visual2 from "./pages/Visual2";
import Visual3 from "./pages/Visual3";

import './App.css';

function App() {
  return (
      <Router>
          <Route exact path='/' component={ Home }/>
          <Route exact path='/visual1' component={ Visual1 }/>
          <Route exact path='/visual2' component={ Visual2 }/>
          <Route exact path='/visual3' component={ Visual3 }/>
      </Router>
  );
}

export default App;
