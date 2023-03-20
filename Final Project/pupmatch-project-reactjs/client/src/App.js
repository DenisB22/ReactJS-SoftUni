import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import * as dogService from './services/dogService';

import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ChatBox } from './components/Chat/ChatBox';

import { AuthContext } from './context/AuthContext';

import './components/Chat/style.scss';


function App() {
  const [cards, setCards] = useState([]);
  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);

  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/" />
    }

    return children;
  };

  useEffect(() => {
    dogService.getAll()
      .then(result => {
        setCards(result)
      })
  }, []);

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home cards={cards} currentUser={currentUser} />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/messages" element={
        <ProtectedRoute>
          <ChatBox />
        </ProtectedRoute>
        } />
        {/* <Route path="/messages" element={<ChatBox />} /> */}
      </Routes>
    </div>
  );
}

export default App;
