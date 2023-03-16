import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import logo from '../../images/pupmatch-logo-2.png'
import useStyles from "../../styles";


export const Header = () => {
    const classes = useStyles();

    return (
        <AppBar position="relative">
        <Toolbar>
        <img className={classes.image} src={logo} alt="Pupmatch Logo"/>
          <Button href="/" variant="string">
            <Typography href="/" variant="h6" color="inherit" noWrap>Pupmatch</Typography>
          </Button>
        </Toolbar>
      </AppBar>
    );
};