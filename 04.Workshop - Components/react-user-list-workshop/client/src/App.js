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

  return (
    <Fragment>
      <Header />
      <main className="main">
        <section className="card users-container">
          <Search />

          <UserList users={users} />

          <button className="btn-add btn">Add new user</button>
        </section>
      </main>
      <Footer />
    </Fragment>
  );
}

export default App;
