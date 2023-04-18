import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
// import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Footer } from "../Footer/Footer";
import { createUserWithEmailAndPassword, updateEmail, updatePassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {  collection, doc, getDoc, getDocs, updateDoc } from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import  { Link } from 'react-router-dom';

const theme = createTheme();

export const EditProfile = ({
  setCards,
}) => {
  const [err, setErr] = useState(false);
  const [profile, setProfile] = useState({ 
    firstName: '', 
    lastName: '', 
    city: '', 
    country: '', 
    gender: '',
    age: '',
    breed: '',
    imageUrl: '',
    email: '',
    password: '',
    additionalInfo: '',
   })

  const navigate = useNavigate();
  const { uid } = useParams();

  useEffect(() => {
    const fetchProfile = async () => {
      const postDoc = await getDoc(doc(db, "users", uid));
      if (postDoc.exists()) {
        const profileData = postDoc.data();
        // .log(profileData);
        setProfile(profileData);
      } else {
        // console.log("No such user!");
      }
    };

    fetchProfile();
  }, [uid]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // console.log({
    //   displayName: data.get("firstName"),
    //   lastName: data.get("lastName"),
    //   city: data.get("city"),
    //   country: data.get("country"),
    //   gender: data.get("gender"),
    //   age: data.get("age"),
    //   breed: data.get("breed"),
    //   imageUrl: data.get("imageUrl"),
    //   email: data.get("email"),
    //   password: data.get("password"),
    //   additionalInfo: data.get("additionalInfo"),
    // });
    // console.log(event.target);

    const firstName = data.get("firstName");
    const lastName = data.get("lastName");
    const city = data.get("city");
    const country = data.get("country");
    const gender = data.get("gender");
    const age = data.get("age");
    const breed = data.get("breed");
    const file = data.get("file");
    const email = data.get("email");
    const password = data.get("password");
    const additionalInfo = data.get("additionalInfo");

    // console.log(file.name);


    try {
      // const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      if (user) {
        if (email !== user.email) {
          await updateEmail(user, email);
        }
        if (password) {
          await updatePassword(user, password);
        }
      }


      const storageRef = ref(storage, firstName);
      // const storageRef = ref(storage, uid);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            // await updateProfile(res.user, {
            //   displayName: firstName,
            //   photoURL: downloadURL,
            // });
            await updateDoc(doc(db, "users", uid), {
              firstName,
              lastName,
              email,
              gender,
              breed,
              city,
              country,
              additionalInfo,
              password,
              age,
              photoURL: downloadURL,
            });
            
            const updatedProfile = await getDocs(collection(db, "users"));
            setCards(updatedProfile.docs.map((doc) => (
              {...doc.data()}
            )))
            navigate("/");
          });

        }
      );
    } catch (err) {
      setErr(true);
    }
  };


  
 
  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Edit Profile
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  // label="Puppy's First Name"
                  value={profile.firstName}
                  onChange={(e) => setProfile({ ...profile, firstName: e.target.value })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  // label="Puppy's Last Name"
                  value={profile.lastName}
                  onChange={(e) => setProfile({ ...profile, lastName: e.target.value })}
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  // label="Puppy's City"
                  value={profile.city}
                  onChange={(e) => setProfile({ ...profile, city: e.target.value })}
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  // label="Puppy's Country"
                  name="country"
                  value={profile.country}
                  onChange={(e) => setProfile({ ...profile, country: e.target.value })}
                  autoComplete="country"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  // label="Puppy's Gender"
                  name="gender"
                  value={profile.gender}
                  onChange={(e) => setProfile({ ...profile, gender: e.target.value })}
                  autoComplete="gender"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  // label="Puppy's Age"
                  value={profile.age}
                  onChange={(e) => setProfile({ ...profile, age: e.target.value })}
                  name="age"
                  autoComplete="age"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="breed"
                  // label="Puppy's Breed"
                  name="breed"
                  value={profile.breed}
                  onChange={(e) => setProfile({ ...profile, breed: e.target.value })}
                  autoComplete="breed"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  // label="Puppy's Image"
                  name="image"
                  autoComplete="image"
                  value={profile.imageUrl}
                  onChange={(e) => setProfile({ ...profile, imageUrl: e.target.value })}
                  InputProps={{
                    readOnly: true,
                  }}
                />
                <Button variant="contained" component="label">
                  Upload Image
                  <input 
                  type="file"
                  id="file"
                  name="file"
                  required
                  hidden
                  />
                </Button>
                {/* <input
                  accept="image/*"
                  
                  style={{ display: "none" }}
                  id="raised-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="raised-button-file">
                  <Button
                    variant="raised"
                    component="span"
                    
                  >
                    Upload
                  </Button>
                </label> */}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  // label="Email Address"
                  name="email"
                  value={profile.email}
                  onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  // label="Password"
                  type="password"
                  id="password"
                  value={profile.password}
                  onChange={(e) => setProfile({ ...profile, password: e.target.value })}
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  fullWidth
                  // label="Additional Info"
                  value={profile.additionalInfo}
                  onChange={(e) => setProfile({ ...profile, additionalInfo: e.target.value })}
                  name="additionalInfo"
                  
                  type="info"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox value="allowExtraEmails" color="primary" />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Edit
            </Button>
            
          </Box>
          {err && <span>Something went wrong</span>}
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};
