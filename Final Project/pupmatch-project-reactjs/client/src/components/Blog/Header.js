import * as React from "react";
import PropTypes from "prop-types";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
// import Link from "@mui/material/Link";
import { Link } from "react-router-dom";
import { useContext } from "react";

import useStyles from "../../styles";

import { AuthContext } from "../../context/AuthContext";

import { auth } from "../../firebase";
import { signOut } from "firebase/auth";


function Header(props) {
  const { sections, title } = props;

  const classes = useStyles();

  const { currentUser } = useContext(AuthContext);

  return (
    <React.Fragment>
      <Toolbar sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Button href="" variant="string">
          <Typography variant="h6" color="inherit" noWrap>
            <Link to="/" className={classes.homeLinkBlog}>
              Pupmatch
            </Link>
          </Typography>
        </Button>

        <Typography
          component="h2"
          variant="h5"
          color="inherit"
          align="center"
          noWrap
          sx={{ flex: 1 }}
        >
          {title}
        </Typography>
        <IconButton>
          <SearchIcon />
        </IconButton>
        {currentUser ? (
          // <Button variant="outlined" size="small">
          //   Logout
          // </Button>
          <Button onClick={() => signOut(auth)} variant="outlined">Logout</Button>
        ) : (
          <Button variant="contained">
            <Link to="/login" className={classes.loginLink}>
              Login
            </Link>
          </Button>
        )}
      </Toolbar>
      <Toolbar
        component="nav"
        variant="dense"
        sx={{ justifyContent: "space-between", overflowX: "auto" }}
      ></Toolbar>
    </React.Fragment>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

export default Header;
