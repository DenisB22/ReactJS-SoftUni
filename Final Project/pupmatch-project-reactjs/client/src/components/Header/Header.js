import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from "../../images/pupmatch-logo-2.png";
import useStyles from "../../styles";

import { Link } from "react-router-dom";

export const Header = () => {
  const classes = useStyles();

  return (
    <AppBar position="relative">
      <Toolbar>
        <img className={classes.imageLogo} src={logo} alt="Pupmatch Logo" />
        <Button variant="string">
            <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.homeLink}>
                  Pupmatch
                </Link>
            </Typography>
          </Button>
      </Toolbar>
    </AppBar>
  );
};
