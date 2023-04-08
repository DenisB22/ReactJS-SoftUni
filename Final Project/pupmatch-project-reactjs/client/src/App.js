import { useState, useEffect, useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';


import { Home } from "./components/Home/Home";
import { Login } from "./components/Login/Login";
import { Register } from "./components/Register/Register";
import { ChatBox } from './components/Chat/ChatBox';
import { Details } from './components/Details/Details';
import { EditProfile } from './components/EditProfile/EditProfile';


import * as dogService from './services/dogService';
import { AuthContext } from './context/AuthContext';

import { db } from './firebase';
import { collection,  getDocs } from 'firebase/firestore';

import './components/Chat/style.scss';
import { Button } from '@mui/material';


function App() {
  const [cards, setCards] = useState([]); // Storing the data when we fetch all the docs
  const [card, setCard] = useState({});

  const usersCollectionRef = collection(db, "users");

  const {currentUser} = useContext(AuthContext);
  // console.log(currentUser);


  const ProtectedRoute = ({children}) => {
    if(!currentUser) {
      return <Navigate to="/" />
    }

    return children;
  };

  const getCardFromDetails = (dataFromDetails) =>  {
    console.log('Hello from getCardFromDetails')
    setCard(dataFromDetails);
    console.log('hello')
    console.log(`card from App: ${dataFromDetails}`);
    
  }

  useEffect(() => {
    console.log('Hello from useEffect');
    const getUsers = async () => {
      console.log("getUsers called");
      const data = await getDocs(usersCollectionRef);
      // console.log(data);
      setCards(data.docs.map(doc => ({...doc.data(), id: doc.id})));
    }
    console.log(cards.length)
    getUsers();
  }, []);



  return (
    <div>
      <Routes>
        <Route path="/" element={<Home cards={cards} currentUser={currentUser} />} /> 
        <Route path="/login" element={<Login />} />
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/register" element={<Register setCards={setCards} />} />
        {/* <Route path="/register" element={<Register />} /> */}
        <Route path="/messages" element={
        <ProtectedRoute>
          <ChatBox card={card} />
        </ProtectedRoute>
        } />
        {/* <Route path="/messages" element={<ChatBox />} /> */}
        {/* <Route path='/details' element={<Details card={card} />} /> */}
        {/* <Route path='/details' element={<Details/>} /> */}
        <Route path='/details/:uid' element={<Details setCards={setCards} sendData={getCardFromDetails}/>}/>
        {/* <Route path='edit/:uid' element={<EditProfile />} /> */}
        <Route path='edit/:uid' element={<EditProfile setCards={setCards} />} />
        
      </Routes>
    </div>
  );
}




export default (App);
