import { Fragment, useEffect, useState } from "react";

import * as userService from "./services/userService";

import { Footer } from "./components/Footer";
import { Header } from "./components/Header";
import { Search } from "./components/Search";
import "./App.css";
import { UserList } from "./components/UserList";

function App() {
  const [users, setUsers] = useState([]);

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
  });

  const [formErrors, setFormErrors] = useState({
    firstName: '',
    lastName: '',
  });

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

    setUsers(state => state.map(x => x._id === userId ? updatedUser : x));
  };

  const onUserDelete = async (userId) => {
    // Delete from server
    await userService.remove(userId);

    // Delete from state
    setUsers(state => state.filter(x => x._id !== userId));
    
  };

  const formChangeHandler = (e) => {
    

    setFormValues(state => ({...state, [e.target.name]: e.target.value}));
  };

  const formValidate = (e) => {
    const value = e.target.value;
    let errors = {};
    if (e.target.name === 'firstName' && (value.length < 3 || value.length > 20)) {
      // setFormErrors(state => ({...state, firstName: 'First name should be between 3 and 20 characters'}));
      errors.firstName = 'First name should be between 3 and 20 characters';
    } else {

    }

    if (e.target.name === 'lastName' && (value.length < 3 || value.length > 20)) {
      // setFormErrors(state => ({...state, lastName: 'Last name should be between 3 and 20 characters'}));
      errors.lastName = 'Last name should be between 3 and 20 characters';
    }

    setFormErrors(errors);
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
            formvalues={formValues}
            formChangeHandler={formChangeHandler}
            formErrors={formErrors}
            formValidate={formValidate}
          />

          
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
