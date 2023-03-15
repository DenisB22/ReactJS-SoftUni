import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <header>
      <img className="pupmatchLogo" src="./images/pupmatch-logo.png" alt="" />
      <h1>
        <Link className="home" to="/">
          Pupmatch
        </Link>
      </h1>
      <nav>
        <Link to="/catalog">All Puppies</Link>

        <div id="user">
          <Link to="/create-page">Create Puppy Profile</Link>
          <Link to="/logout">Logout</Link>
        </div>

        <div id="guest">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </nav>
    </header>
  );
};
