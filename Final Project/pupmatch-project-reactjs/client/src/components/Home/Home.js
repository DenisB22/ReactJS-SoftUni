import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import useStyles from "../../styles";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signOut } from "firebase/auth";

import { Link } from 'react-router-dom';

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DogItem } from "../DogItem/DogItem";
import { auth } from "../../firebase";

import logo from "../../images/pupmatch-logo-2.png";

const theme = createTheme();

export const Home = ({ cards, currentUser }) => {
  const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Header />
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            bgcolor: "background.paper",
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth="sm">
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="text.primary"
              gutterBottom
              className={classes.nameLogoContainer}
            >
              <span>Pupmatch</span>
              <img className={classes.imageLogo} src={logo} alt="Pupmatch Logo" />
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome to Pupmatch - where dog lovers can find the perfect
              match for their puppies. Connect with adorable pups in your area and make new furry
              friends. Join our community and let's bark up some great matches
              together!
            </Typography>
            <Stack
              sx={{ pt: 4 }}
              direction="row"
              spacing={2}
              justifyContent="center"
            >
              {currentUser ? 
              <>
                <Button variant="outlined">
                  <Link to="/messages" className={classes.messagesLink}>
                    Messages
                  </Link>
                </Button>
                <Button onClick={() => signOut(auth)} variant="contained">Logout</Button>
              </> :
              <>
                {/* <Button href="/login" variant="contained">Login</Button> */}
                <Button variant="contained">
                  <Link to="/login" className={classes.loginLink}>
                    Login
                  </Link>
                </Button>
                {/* <Button href="/register" variant="outlined">Register</Button> */}
                <Button variant="outlined">
                  <Link to="/register" className={classes.registerLink}>
                    Register
                  </Link>
                </Button>
                {/* <Button onClick={getUser}>Get User</Button> */}
              </>
              }

              {/* <Button href="/login" variant="contained">Login</Button>
              <Button href="/register" variant="outlined">Register</Button>
              <Button href="/messages" variant="outlined">Messages</Button>
              <Button onClick={() => signOut(auth)} variant="contained">Logout</Button>  */}
            </Stack>
          </Container>
        </Box>

        <DogItem cards={cards} />
        {/* {dogs.map(x => <DogItem key={x._id} {...x} />)} */}
      </main>
      {/* Footer */}
      <Footer />
      {/* End footer */}
    </ThemeProvider>
  );
};
