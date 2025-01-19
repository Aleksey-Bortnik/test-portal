import React from 'react'
import './App.scss';
import { MainPage } from './pages/main';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CardInfo } from './pages/card_info';
import { Page404 } from './pages/404';

function App() {
  return (
  <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/card-info" element={<CardInfo />} />
      <Route path="*" element={<Page404 />} />
    </Routes>
  </Router>)
}
export default App;
