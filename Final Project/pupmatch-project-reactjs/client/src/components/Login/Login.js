import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Footer } from '../Footer/Footer';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';


const theme = createTheme();

export const Login = () => {
  // const [err, setErr] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   email: data.get('email'),
    //   password: data.get('password'),
    // });
    const email = data.get("email");
    const password = data.get("password");

    if (!email) {
      setEmailError('Please enter an email!');
      return;
      
    } else {
      setEmailError('');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email!');
      return;
    } else {
      setEmailError('');
    }

    const usersRef = collection(db, "users");
   
    const queryEmail = query(usersRef, where('email', '==', email));
    const snapshot = await getDocs(queryEmail);
    console.log(snapshot);
    console.log(snapshot.size);
    const emailExists = snapshot.size >= 1;
    if (!emailExists) {
      console.log(email);
      setEmailError('Email does not exist!');
      return;
    } else {
      setEmailError('');
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch(err) {
      // setErr(true);
      setPasswordError('Invalid Password!');
    }

  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            
            backgroundImage: 'url(https://source.unsplash.com/random/?Dog)',
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Login
            </Typography>
            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                helperText={emailError}
                error={Boolean(emailError)}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                helperText={passwordError}
                error={Boolean(passwordError)}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Login
              </Button>
              <Grid container>
                <Grid item xs>
                  {/* <Link href="#" variant="body2">
                    Forgot password?
                  </Link> */}

                  <Link to="#">
                    Forgot password?
                  </Link> 
                  
                </Grid>
                <Grid item>
                  {/* <Link href="/register" variant="body2">
                    {"Don't have an account? Register"}
                  </Link> */}

                  <Link to="/register">
                    {"Don't have an account? Register"}
                  </Link>   
                </Grid>
              </Grid>
              
              <Footer />
            </Box>
            {/* {err && <span>Something went wrong</span>} */}

          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>

  );
}