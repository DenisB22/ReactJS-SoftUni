import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { signOut } from "firebase/auth";

import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { DogItem } from "../DogItem/DogItem";
import { auth } from "../../firebase";

const theme = createTheme();

export const Home = ({ cards, currentUser }) => {

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
            >
              Pupmatch
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              paragraph
            >
              Welcome to Pupmatch - where dog lovers can find their perfect
              match. Connect with adorable pups in your area and make new furry
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
                <Button href="/messages" variant="outlined">Messages</Button>
                <Button onClick={() => signOut(auth)} variant="contained">Logout</Button>
              </> :
              <>
                <Button href="/login" variant="contained">Login</Button>
                <Button href="/register" variant="outlined">Register</Button>
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
