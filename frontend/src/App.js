import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Nav from './components/Nav';
import Homepage from './pages/Homepage';
import Projects from './pages/Peojects';
import SingleProject from './pages/SingleProject';
import PageNotFound from './pages/PageNotFound';
import AddProject from './components/Project/AddProject';

function App() {
  return (
    <div className="App">
      <Nav></Nav>
      <Homepage></Homepage>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/add-new-project" element={<AddProject />} />
        <Route path="/projects/:id" element={<SingleProject />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
