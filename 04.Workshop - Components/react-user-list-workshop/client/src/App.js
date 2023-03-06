import { Fragment, useEffect, useState } from "react";

import * as userService from "./services/userService";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import "./App.css";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    userService
      .getAll()
      // .then(setUsers)
      .then((users) => {
        setUsers(users);
      })
      .catch((err) => {
        console.log("Error" + err);
      });
  }, []);

  const onUserCreateSubmit = async (e) => {
    // Stop automatic form submit
    e.preventDefault();

    // Take form data from DOM Tree
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    // Send AJAX Request to server
    const createdUser = await userService.create(data);
    
    // If successfull add new user to the state
    setUsers(state => [...state, createdUser]);

    // Close dialog

  };

  const onUserUpdateSubmit = async (e, userId) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    const updatedUser = await userService.update(userId, data);

    setUsers(state => state.map(x => x._id == userId ? updatedUser : x));
  };

  const onUserDelete = async (userId) => {
    // Delete from server
    await userService.remove(userId);

    // Delete from state
    setUsers(state => state.filter(x => x._id !== userId));
    
  };

  return (
    <Fragment>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />

          <UserList 
            users={users} 
            onUserCreateSubmit={onUserCreateSubmit}
            // onDeleteClick={onUserDelete}
            onUserUpdateSubmit={onUserUpdateSubmit} 
            onUserDelete={onUserDelete} 
          />

          
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
