import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ChatBox } from './components/Chat/ChatBox';
import { Details } from './components/Details/Details';

import * as dogService from './services/dogService';
import { AuthContext } from './context/AuthContext';

import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

import './components/Chat/style.scss';


function App() {
  const [cards, setCards] = useState([]);
  const usersCollectionRef = collection(db, "users");

  const {currentUser} = useContext(AuthContext);
  console.log(currentUser);


  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/" />
    }

    return children;
  };

  // useEffect(() => {
  //   dogService.getAll()
  //     .then(result => {
  //       setCards(result)
  //     })
  // }, []);

  // return (
  //   <div>
  //     <Routes>
  //       <Route path="/" element={<Home cards={cards} currentUser={currentUser} />} />
  //       <Route path="/login" element={<Login />} />
  //       {/* <Route path="/login" element={<Login />} /> */}
  //       <Route path="/register" element={<Register />} />
  //       {/* <Route path="/register" element={<Register />} /> */}
  //       <Route path="/messages" element={
  //       <ProtectedRoute>
  //         <ChatBox />
  //       </ProtectedRoute>
  //       } />
  //       {/* <Route path="/messages" element={<ChatBox />} /> */}
  //     </Routes>
  //   </div>
  // );

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(usersCollectionRef);
      console.log(data);
      setCards(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }

    getUsers();
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
        <Route path='/details' element={<Details />} />
      </Routes>
    </div>
  );
}

export default App;
