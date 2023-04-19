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

  const [firstNameError, setFirstNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [cityError, setCityError] = useState("");
  const [countryError, setCountryError] = useState("");
  const [genderError, setGenderError] = useState("");
  const [ageError, setAgeError] = useState("");
  const [breedError, setBreedError] = useState("");
  const [imageError, setImageError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [additionalInfoError, setAdditionalInfoError] = useState("");

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

    // Validate data
    if (!firstName) {
      setFirstNameError("Please enter first name!");
    } else if (firstName.length < 2 || firstName.length > 50) {
      setFirstNameError("First name must be between 2 and 50 characters!");
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setFirstNameError("Please enter a valid first name!");
    } else {
      setFirstNameError("");
    }

    if (!lastName) {
      setLastNameError("Please enter last name!");
    } else if (lastName.length < 2 || lastName.length > 50) {
      setFirstNameError("Last name must be between 2 and 50 characters!");
    } else if (!/^[A-Za-z]+$/.test(lastName)) {
      setFirstNameError("Please enter a valid last name!");
    } else {
      setFirstNameError("");
    }

    if (!city) {
      setCityError("Please enter city name!");
    } else if (city.length < 2 || city.length > 50) {
      setCityError("City name must be between 2 and 50 characters!");
    } else if (!/^[A-Za-z]+$/.test(city)) {
      setCityError("Please enter a valid city name!");
    } else {
      setCityError("");
    }

    if (!country) {
      setCountryError("Please enter country name!");
    } else if (country.length < 2 || country.length > 50) {
      setCountryError("Country name must be between 2 and 50 characters!");
    } else if (!/^[A-Za-z]+$/.test(country)) {
      setCountryError("Please enter a valid country name!");
    } else {
      setCountryError("");
    }

    if (!gender) {
      setGenderError("Please enter gender!");
    } else if (gender.length < 1 || gender.length > 10) {
      setGenderError("Gender must be between 1 and 10 characters");
    } else if (!/^[A-Za-z]+$/.test(gender)) {
      setGenderError("Please enter a valid gender!");
    } else if (!/^male$|^female$|^Male$|^Female$/.test(gender)) {
      setGenderError(
        "Please enter a valid gender - Male, Female, male, female!"
      );
    } else {
      setGenderError("");
    }

    if (!age) {
      setAgeError("Please enter a valid age!");
    } else if (!age || isNaN(parseInt(age))) {
      setAgeError("Age must be a number!");
    } else if (parseInt(age) < 1 || parseInt(age) > 35) {
      setAgeError("Age must be between 1 and 35");
    } else {
      setAgeError("");
    }

    if (!breed) {
      setBreedError("Please enter breed!");
    } else if (breed.length < 2 || breed.length > 50) {
      setBreedError("Breed name must be between 2 and 50 characters!");
    } else if (!/^[A-Za-z ]+$/.test(breed)) {
      setBreedError("Please enter a valid breed name!");
    } else {
      setBreedError("");
    }

    if (!file) {
      setImageError("Please enter an image!");
    } else if (!file.type.startsWith("image/")) {
      setImageError("Please upload an image!");
    } else {
      setImageError("");
    }

    if (!email) {
      setEmailError("Please enter an email!");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email!");
    } else {
      // validateEmail(email);
      // const usersRef = collection(db, "users");
      // const snapshot = await getDocs(usersRef);
      // const users = snapshot.docs.map((doc) => doc.data());
      // const emailExists = users.some((user) => user.email === email);

      // if (emailExists) {
      //   setEmailError("This email is already in use");
      //   console.log("This email is already in use");
      // } else {
      //   setEmailError("");
      //   setEmail(email);
      // }
      setEmailError("");
    }

    if (!password) {
      setPasswordError("Please enter a password!");
      return;
    } else if (password.length < 8 || password.length > 32) {
      setPasswordError("Password must be between 8 and 32 characters!");
      return;
    } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
      setPasswordError(
        "Password must contain at least one letter and one number!"
      );
      return;
    } else {
      setPasswordError("");
    }

    if (!additionalInfo) {
      setAdditionalInfoError("Please enter additional info!");
    } else if (additionalInfo.length < 2 || additionalInfo.length > 500) {
      setAdditionalInfoError(
        "Additional info must be between 2 and 500 characters!"
      );
    } else {
      setAdditionalInfoError("");
    }


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
                  helperText={firstNameError}
                  error={Boolean(firstNameError)}
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
                  autoComplete="lastName"
                  helperText={lastNameError}
                  error={Boolean(lastNameError)}
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
                  helperText={cityError}
                  error={Boolean(cityError)}
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
                  helperText={countryError}
                  error={Boolean(countryError)}
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
                  helperText={genderError}
                  error={Boolean(genderError)}
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
                  helperText={ageError}
                  error={Boolean(ageError)}
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
                  helperText={breedError}
                  error={Boolean(breedError)}
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
                  helperText={imageError}
                  error={Boolean(imageError)}
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
                  helperText={emailError}
                  error={Boolean(emailError)}
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
                  helperText={passwordError}
                  error={Boolean(passwordError)}
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
                  helperText={additionalInfoError}
                  error={Boolean(additionalInfoError)}
                  
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
