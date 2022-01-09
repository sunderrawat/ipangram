import React from 'react';
import './App.css';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import Routes from './Routes/Routes';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Homepage></Homepage>
      <Routes></Routes>
    </div>
  );
}

export default App;
