import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as dogService from './services/dogService';

import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";


function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    dogService.getAll()
      .then(result => {
        setCards(result)
      })
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home cards={cards} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      {/* <Home /> */}
      {/* <Login /> */}
      {/* <Register /> */}
    </div>
  );
}

export default App;
