import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

export const Navbar = () => {
    const {currentUser} = useContext(AuthContext);
    // (currentUser);

    return (
        <div className="navbar">
            <span className="logo">Pupmatch</span>
            <div className="user">
                <img src={currentUser.photoURL} alt="" />
                <span>{currentUser.displayName}</span>
                {/* <span>{currentUser.firstName}</span> */}
                {/* <button>Home</button> */}
                <Link className="button" to="/"><span>Home</span></Link>
            </div>
        </div>
    );
};