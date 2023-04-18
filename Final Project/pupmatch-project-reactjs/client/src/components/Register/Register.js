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
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const theme = createTheme();

export const Register = ({ setCards }) => {
  // const [err, setErr] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [formValid, setFormValid] = useState(false);

  const [firstNameError, setFirstNameError] = useState("");
  const [isFirstNameValid, setIsFirstNameValid] = useState(true);

  const [lastNameError, setLastNameError] = useState("");
  const [isLastNameValid, setIsLastNameValid] = useState(true);

  const [cityError, setCityError] = useState("");
  const [isCityValid, setIsCityValid] = useState(true);

  const [countryError, setCountryError] = useState("");
  const [isCountryValid, setIsCountryValid] = useState(true);

  const [genderError, setGenderError] = useState("");
  const [isGenderValid, setIsGenderValid] = useState(true);

  const [ageError, setAgeError] = useState("");
  const [isAgeValid, setIsAgeValid] = useState(true);

  const [breedError, setBreedError] = useState("");
  const [isBreedValid, setIsBreedValid] = useState(true);

  const [imageError, setImageError] = useState("");
  const [isImageValid, setIsImageValid] = useState(true);

  const [emailError, setEmailError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(true);

  const [passwordError, setPasswordError] = useState("");
  const [isPasswordValid, setIsPasswordValid] = useState(true);

  const [additionalInfoError, setAdditionalInfoError] = useState("");
  const [isAdditionalInfoValid, setIsAdditionalInfoValid] = useState(true);

  // const validateEmail = async (email) => {
  //   const usersRef = collection(db, "users");
  //   const snapshot = await getDocs(usersRef);
  //   const users = snapshot.docs.map((doc) => doc.data());
  //   const emailExists = users.some((user) => user.email === email);

  //   if (emailExists) {
  //     setEmailError("This email is already in use");
  //     console.log("This email is already in use");
  //   } else {
  //     setEmailError("");
  //     setEmail(email);
  //   }
  // };

  const handleFirstNameChange = (event) => {
    const firstName = event.target.value;
    if (!firstName) {
      setFirstNameError("Please enter first name!");
      setIsFirstNameValid(false);
    } else if (firstName.length < 2 || firstName.length > 50) {
      setFirstNameError("First name must be between 2 and 50 characters!");
      setIsFirstNameValid(false);
    } else if (!/^[A-Za-z]+$/.test(firstName)) {
      setFirstNameError("Please enter a valid first name!");
      setIsFirstNameValid(false);
    } else {
      setFirstNameError("");
      setIsFirstNameValid(true);
    }
  };

  const handleLastNameChange = (event) => {
    const lastNameValue = event.target.value.trim();
    if (!lastNameValue) {
      setLastNameError("Please enter last name!");
      setIsLastNameValid(false);
    } else if (lastNameValue.length < 2 || lastNameValue.length > 50) {
      setLastNameError("Last name must be between 2 and 50 characters!");
      setIsLastNameValid(false);
    } else if (!/^[A-Za-z]+$/.test(lastNameValue)) {
      setLastNameError("Please enter a valid last name!");
      setIsLastNameValid(false);
    } else {
      setLastNameError("");
      setIsLastNameValid(true);
    }
  };

  const handlePasswordChange = (event) => {
    const { value } = event.target;
    if (!value) {
      setPasswordError("Please enter a password!");
      setIsPasswordValid(false);
    } else if (value.length < 8 || value.length > 32) {
      setPasswordError("Password must be between 8 and 32 characters!");
      setIsPasswordValid(false);
    } else if (!/\d/.test(value) || !/[a-zA-Z]/.test(value)) {
      setPasswordError(
        "Password must contain at least one letter and one number!"
      );
      setIsPasswordValid(false);
    } else {
      setPasswordError("");
      setIsPasswordValid(true);
    }
  };

  const handleCityChange = (event) => {
    const cityValue = event.target.value.trim();
    if (!cityValue) {
      setCityError("Please enter city name!");
      setIsCityValid(false);
    } else if (cityValue.length < 2 || cityValue.length > 50) {
      setCityError("City name must be between 2 and 50 characters!");
      setIsCityValid(false);
    } else if (!/^[A-Za-z]+$/.test(cityValue)) {
      setCityError("Please enter a valid city name!");
      setIsCityValid(false);
    } else {
      setCityError("");
      setIsCityValid(true);
    }
  };

  const handleCountryChange = (event) => {
    const countryValue = event.target.value.trim();
    if (!countryValue) {
      setCountryError("Please enter country name!");
      setIsCountryValid(false);
    } else if (countryValue.length < 2 || countryValue.length > 50) {
      setCountryError("Country name must be between 2 and 50 characters!");
      setIsCountryValid(false);
    } else if (!/^[A-Za-z]+$/.test(countryValue)) {
      setCountryError("Please enter a valid country name!");
      setIsCountryValid(false);
    } else {
      setCountryError("");
      setIsCountryValid(true);
    }
  };

  const handleGenderChange = (event) => {
    const genderValue = event.target.value.trim();
    if (!genderValue) {
      setGenderError("Please enter gender!");
      setIsGenderValid(false);
    } else if (genderValue.length < 1 || genderValue.length > 10) {
      setGenderError("Gender must be between 1 and 10 characters");
      setIsGenderValid(false);
    } else if (!/^[A-Za-z]+$/.test(genderValue)) {
      setGenderError("Please enter a valid gender!");
      setIsGenderValid(false);
    } else if (!/^male$|^female$|^Male$|^Female$/.test(genderValue)) {
      setGenderError(
        "Please enter a valid gender - Male, Female, male, female!"
      );
      setIsGenderValid(false);
    } else {
      setGenderError("");
      setIsGenderValid(true);
    }
  };

  const handleAgeChange = (event) => {
    const ageValue = event.target.value.trim();
    if (!ageValue) {
      setAgeError("Please enter a valid age!");
      setIsAgeValid(false);
    } else if (!ageValue || isNaN(parseInt(ageValue))) {
      setAgeError("Age must be a number!");
      setIsAgeValid(false);
    } else if (parseInt(ageValue) < 1 || parseInt(ageValue) > 35) {
      setAgeError("Age must be between 1 and 35");
      setIsAgeValid(false);
    } else {
      setAgeError("");
      setIsAgeValid(true);
    }
  };

  const handleBreedChange = (event) => {
    const breedValue = event.target.value.trim();
    if (!breedValue) {
      setBreedError("Please enter breed!");
      setIsBreedValid(false);
    } else if (breedValue.length < 2 || breedValue.length > 50) {
      setBreedError("Breed name must be between 2 and 50 characters!");
      setIsBreedValid(false);
    } else if (!/^[A-Za-z ]+$/.test(breedValue)) {
      setBreedError("Please enter a valid breed name!");
      setIsBreedValid(false);
    } else {
      setBreedError("");
      setIsBreedValid(true);
    }
  };

  // const handleImageChange = (event) => {
  //   const selectedFile = event.target.files[0];
  //   if (!selectedFile) {
  //     setImageError("Please enter an image!");
  //     setIsImageValid(false);
  //   } else if (!selectedFile.type.startsWith("image/")) {
  //     setImageError("Please upload an image!");
  //     setIsImageValid(false);
  //   } else {
  //     setImageError("");
  //     setIsImageValid(true);
  //   }
  // };

  const handleEmailChange = (event) => {
    const emailValue = event.target.value.trim();
    if (!emailValue) {
      setEmailError("Please enter an email!");
      setIsEmailValid(false);
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
      setEmailError("Please enter a valid email!");
      setIsEmailValid(false);
    } else {
      setEmailError("");
      setIsEmailValid(true);
    }
  };

  const handleAdditionalInfoChange = (event) => {
    const additionalInfoValue = event.target.value.trim();
    if (!additionalInfoValue) {
      setAdditionalInfoError("Please enter additional info!");
      setIsAdditionalInfoValid(false);
    } else if (
      additionalInfoValue.length < 2 ||
      additionalInfoValue.length > 200
    ) {
      setAdditionalInfoError(
        "Additional info must be less than 200 characters!"
      );
      setIsAdditionalInfoValid(false);
    } else {
      setAdditionalInfoError("");
      setIsAdditionalInfoValid(true);
    }
  };

  useEffect(() => {
    setFormValid(
      firstNameError === "" &&
        lastNameError === "" &&
        cityError === "" &&
        countryError === "" &&
        genderError === "" &&
        ageError === "" &&
        breedError === "" &&
        imageError === "" &&
        additionalInfoError === "" &&
        emailError === "" &&
        passwordError === ""
    );
  }, [
    passwordError,
    firstNameError,
    lastNameError,
    cityError,
    countryError,
    genderError,
    ageError,
    breedError,
    imageError,
    additionalInfoError,
    emailError,
  ]);

  // const checkFormValidity = () => {
  //   if (!isFirstNameValid || !isLastNameValid || !isCityValid || !isCountryValid || !isGenderValid || !isAgeValid || !isImageValid || !isEmailValid || !isPasswordValid || !isAdditionalInfoValid) {
  //       setFormValid(false);
  //   } else {
  //     setFormValid(true);
  //   }
  // };

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
      const res = await createUserWithEmailAndPassword(auth, email, password);

      const storageRef = ref(storage, firstName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          // setErr(true);
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateProfile(res.user, {
              displayName: firstName,
              photoURL: downloadURL,
            });
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              firstName,
              email,
              gender,
              breed,
              city,
              country,
              additionalInfo,
              age,
              photoURL: downloadURL,
            });

            setCards((prevCards) => [
              ...prevCards,
              {
                uid: res.user.uid,
                firstName,
                email,
                gender,
                breed,
                city,
                country,
                additionalInfo,
                age,
                photoURL: downloadURL,
              },
            ]);

            
            navigate("/");
          });
        }
      );
    } catch (err) {
      // setErr(true);
      if (email) {
        setEmailError("This email is already in use");
      }
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
            Register
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
                  label="Puppy's First Name"
                  autoFocus
                  helperText={firstNameError}
                  error={Boolean(firstNameError)}
                  inputProps={{
                    onChange: handleFirstNameChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Puppy's Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  helperText={lastNameError}
                  error={Boolean(lastNameError)}
                  inputProps={{
                    onChange: handleLastNameChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="city"
                  name="city"
                  required
                  fullWidth
                  id="city"
                  label="Puppy's City"
                  autoFocus
                  helperText={cityError}
                  error={Boolean(cityError)}
                  inputProps={{
                    onChange: handleCityChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="country"
                  label="Puppy's Country"
                  name="country"
                  autoComplete="country"
                  helperText={countryError}
                  error={Boolean(countryError)}
                  inputProps={{
                    onChange: handleCountryChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="gender"
                  label="Puppy's Gender"
                  name="gender"
                  autoComplete="gender"
                  helperText={genderError}
                  error={Boolean(genderError)}
                  handleGenderChange
                  inputProps={{
                    onChange: handleGenderChange,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="age"
                  label="Puppy's Age"
                  name="age"
                  autoComplete="age"
                  helperText={ageError}
                  error={Boolean(ageError)}
                  handleAgeChange
                  inputProps={{
                    onChange: handleAgeChange,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="breed"
                  label="Puppy's Breed"
                  name="breed"
                  autoComplete="breed"
                  helperText={breedError}
                  error={Boolean(breedError)}
                  inputProps={{
                    onChange: handleBreedChange,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="image"
                  label="Puppy's Image"
                  name="image"
                  autoComplete="image"
                  InputProps={{
                    readOnly: true,
                  }}
                  helperText={imageError}
                  error={Boolean(imageError)}
                  // inputProps={{
                  //   onChange: handleImageChange,
                  // }}
                />
                <Button variant="contained" component="label">
                  Upload Image
                  <input type="file" id="file" name="file" required hidden />
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
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  helperText={emailError}
                  error={Boolean(emailError)}
                  inputProps={{
                    onChange: handleEmailChange,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  helperText={passwordError}
                  error={Boolean(passwordError)}
                  inputProps={{
                    onChange: handlePasswordChange,
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  fullWidth
                  label="Additional Info"
                  name="additionalInfo"
                  type="info"
                  multiline
                  rows={4}
                  helperText={additionalInfoError}
                  error={Boolean(additionalInfoError)}
                  inputProps={{
                    onChange: handleAdditionalInfoChange,
                  }}
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
              disabled={!formValid}
              // onClick={checkFormValidity}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link> */}
                <Link to="/login">Already have an account? Login</Link>
              </Grid>
            </Grid>
          </Box>
          {/* {err && <span>Something went wrong</span>} */}
        </Box>
        <Footer />
      </Container>
    </ThemeProvider>
  );
};

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// // import Link from "@mui/material/Link";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";

// import { useState, useEffect } from "react";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { Footer } from "../Footer/Footer";
// import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
// import { auth, db, storage } from "../../firebase";
// import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
// import {
//   collection,
//   doc,
//   getDocs,
//   query,
//   setDoc,
//   where,
// } from "firebase/firestore";
// import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";

// const theme = createTheme();

// export const Register = ({ setCards }) => {
//   const [err, setErr] = useState(false);
//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");

//   const [firstNameError, setFirstNameError] = useState("");
//   const [lastNameError, setLastNameError] = useState("");
//   const [cityError, setCityError] = useState("");
//   const [countryError, setCountryError] = useState("");
//   const [genderError, setGenderError] = useState("");
//   const [ageError, setAgeError] = useState("");
//   const [breedError, setBreedError] = useState("");
//   const [imageError, setImageError] = useState("");
//   const [emailError, setEmailError] = useState("");
//   const [passwordError, setPasswordError] = useState("");
//   const [additionalInfoError, setAdditionalInfoError] = useState("");

//   const validateEmail = async (email) => {
//     const usersRef = collection(db, "users");
//     const snapshot = await getDocs(usersRef);
//     const users = snapshot.docs.map((doc) => doc.data());
//     const emailExists = users.some((user) => user.email === email);

//     if (emailExists) {
//       setEmailError("This email is already in use");
//       console.log("This email is already in use");
//     } else {
//       setEmailError("");
//       setEmail(email);
//     }
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // console.log({
//     //   displayName: data.get("firstName"),
//     //   lastName: data.get("lastName"),
//     //   city: data.get("city"),
//     //   country: data.get("country"),
//     //   gender: data.get("gender"),
//     //   age: data.get("age"),
//     //   breed: data.get("breed"),
//     //   imageUrl: data.get("imageUrl"),
//     //   email: data.get("email"),
//     //   password: data.get("password"),
//     //   additionalInfo: data.get("additionalInfo"),
//     // });
//     // console.log(event.target);

//     const firstName = data.get("firstName");
//     const lastName = data.get("lastName");
//     const city = data.get("city");
//     const country = data.get("country");
//     const gender = data.get("gender");
//     const age = data.get("age");
//     const breed = data.get("breed");
//     const file = data.get("file");
//     const email = data.get("email");
//     const password = data.get("password");
//     const additionalInfo = data.get("additionalInfo");

//     // console.log(file.name);
//     // Validate data
//     if (!firstName) {
//       setFirstNameError("Please enter first name!");
//     } else if (firstName.length < 2 || firstName.length > 50) {
//       setFirstNameError("First name must be between 2 and 50 characters!");
//     } else if (!/^[A-Za-z]+$/.test(firstName)) {
//       setFirstNameError("Please enter a valid first name!");
//     } else {
//       setFirstNameError("");
//     }

//     if (!lastName) {
//       setLastNameError("Please enter last name!");
//     } else if (lastName.length < 2 || lastName.length > 50) {
//       setFirstNameError("Last name must be between 2 and 50 characters!");
//     } else if (!/^[A-Za-z]+$/.test(lastName)) {
//       setFirstNameError("Please enter a valid last name!");
//     } else {
//       setFirstNameError("");
//     }

//     if (!city) {
//       setCityError("Please enter city name!");
//     } else if (city.length < 2 || city.length > 50) {
//       setCityError("City name must be between 2 and 50 characters!");
//     } else if (!/^[A-Za-z]+$/.test(city)) {
//       setCityError("Please enter a valid city name!");
//     } else {
//       setCityError("");
//     }

//     if (!country) {
//       setCountryError("Please enter country name!");
//     } else if (country.length < 2 || country.length > 50) {
//       setCountryError("Country name must be between 2 and 50 characters!");
//     } else if (!/^[A-Za-z]+$/.test(country)) {
//       setCountryError("Please enter a valid country name!");
//     } else {
//       setCountryError("");
//     }

//     if (!gender) {
//       setGenderError("Please enter gender!");
//     } else if (gender.length < 1 || gender.length > 10) {
//       setGenderError("Gender must be between 1 and 10 characters");
//     } else if (!/^[A-Za-z]+$/.test(gender)) {
//       setGenderError("Please enter a valid gender!");
//     } else if (!/^male$|^female$|^Male$|^Female$/.test(gender)) {
//       setGenderError(
//         "Please enter a valid gender - Male, Female, male, female!"
//       );
//     } else {
//       setGenderError("");
//     }

//     if (!age) {
//       setAgeError("Please enter a valid age!");
//     } else if (!age || isNaN(parseInt(age))) {
//       setAgeError("Age must be a number!");
//     } else if (parseInt(age) < 5 || parseInt(age) > 110) {
//       setAgeError("Age must be between 5 and 110");
//     } else {
//       setAgeError("");
//     }

//     if (!breed) {
//       setBreedError("Please enter breed!");
//     } else if (breed.length < 2 || breed.length > 50) {
//       setCityError("Breed name must be between 2 and 50 characters!");
//     } else if (!/^[A-Za-z]+$/.test(breed)) {
//       setCityError("Please enter a valid breed name!");
//     } else {
//       setCityError("");
//     }

//     if (!file) {
//       setImageError("Please enter an image!");
//     } else if (!file.type.startsWith("image/")) {
//       setImageError("Please upload an image!");
//     } else {
//       setImageError("");
//     }

//     if (!email) {
//       setEmailError("Please enter an email!");
//     } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//       setEmailError("Please enter a valid email!");
//     } else {
//       // validateEmail(email);
//       const usersRef = collection(db, "users");
//       const snapshot = await getDocs(usersRef);
//       const users = snapshot.docs.map((doc) => doc.data());
//       const emailExists = users.some((user) => user.email === email);

//       if (emailExists) {
//         setEmailError("This email is already in use");
//         console.log("This email is already in use");
//       } else {
//         setEmailError("");
//         setEmail(email);
//       }
//     }

//     if (!password) {
//       setPasswordError("Please enter a password!");
//     } else if (password.length < 8 || password.length > 32) {
//       setPasswordError("Password must be between 8 and 32 characters!");
//     } else if (!/\d/.test(password) || !/[a-zA-Z]/.test(password)) {
//       setPasswordError(
//         "Password must contain at least one letter and one number!"
//       );
//     } else {
//       setPasswordError("");
//     }

//     if (!additionalInfo) {
//       setAdditionalInfoError("Please enter additional info!");
//     } else if (additionalInfo.length < 2 || additionalInfo.length > 500) {
//       setAdditionalInfoError(
//         "Additional info must be between 2 and 500 characters!"
//       );
//     } else {
//       setAdditionalInfoError("");
//     }

//     try {
//       const res = await createUserWithEmailAndPassword(auth, email, password);

//       const storageRef = ref(storage, firstName);

//       const uploadTask = uploadBytesResumable(storageRef, file);

//       // Register three observers:
//       // 1. 'state_changed' observer, called any time the state changes
//       // 2. Error observer, called on failure
//       // 3. Completion observer, called on successful completion
//       uploadTask.on(
//         (error) => {
//           // Handle unsuccessful uploads
//           setErr(true);
//         },
//         () => {
//           // Handle successful uploads on complete
//           // For instance, get the download URL: https://firebasestorage.googleapis.com/...
//           getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
//             await updateProfile(res.user, {
//               displayName: firstName,
//               photoURL: downloadURL,
//             });
//             await setDoc(doc(db, "users", res.user.uid), {
//               uid: res.user.uid,
//               firstName,
//               email,
//               gender,
//               breed,
//               city,
//               country,
//               additionalInfo,
//               age,
//               photoURL: downloadURL,
//             });

//             setCards((prevCards) => [
//               ...prevCards,
//               {
//                 uid: res.user.uid,
//                 firstName,
//                 email,
//                 gender,
//                 breed,
//                 city,
//                 country,
//                 additionalInfo,
//                 age,
//                 photoURL: downloadURL,
//               },
//             ]);

//             await setDoc(doc(db, "userChats", res.user.uid), {});
//             navigate("/");
//           });
//         }
//       );
//     } catch (err) {
//       setErr(true);
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Register
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="given-name"
//                   name="firstName"
//                   required
//                   fullWidth
//                   id="firstName"
//                   label="Puppy's First Name"
//                   autoFocus
//                   helperText={firstNameError}
//                   error={Boolean(firstNameError)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="lastName"
//                   label="Puppy's Last Name"
//                   name="lastName"
//                   autoComplete="family-name"
//                   helperText={lastNameError}
//                   error={Boolean(lastNameError)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   autoComplete="city"
//                   name="city"
//                   required
//                   fullWidth
//                   id="city"
//                   label="Puppy's City"
//                   autoFocus
//                   helperText={cityError}
//                   error={Boolean(cityError)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="country"
//                   label="Puppy's Country"
//                   name="country"
//                   autoComplete="country"
//                   helperText={countryError}
//                   error={Boolean(countryError)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="gender"
//                   label="Puppy's Gender"
//                   name="gender"
//                   autoComplete="gender"
//                   helperText={genderError}
//                   error={Boolean(genderError)}
//                 />
//               </Grid>
//               <Grid item xs={12} sm={6}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="age"
//                   label="Puppy's Age"
//                   name="age"
//                   autoComplete="age"
//                   helperText={ageError}
//                   error={Boolean(ageError)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="breed"
//                   label="Puppy's Breed"
//                   name="breed"
//                   autoComplete="breed"
//                   helperText={breedError}
//                   error={Boolean(breedError)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="image"
//                   label="Puppy's Image"
//                   name="image"
//                   autoComplete="image"
//                   InputProps={{
//                     readOnly: true,
//                   }}
//                   helperText={imageError}
//                   error={Boolean(imageError)}
//                 />
//                 <Button variant="contained" component="label">
//                   Upload Image
//                   <input type="file" id="file" name="file" required hidden />
//                 </Button>
//                 {/* <input
//                   accept="image/*"
                  
//                   style={{ display: "none" }}
//                   id="raised-button-file"
//                   multiple
//                   type="file"
//                 />
//                 <label htmlFor="raised-button-file">
//                   <Button
//                     variant="raised"
//                     component="span"
                    
//                   >
//                     Upload
//                   </Button>
//                 </label> */}
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   id="email"
//                   label="Email Address"
//                   name="email"
//                   autoComplete="email"
//                   helperText={emailError}
//                   error={Boolean(emailError)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   name="password"
//                   label="Password"
//                   type="password"
//                   id="password"
//                   autoComplete="new-password"
//                   helperText={passwordError}
//                   error={Boolean(passwordError)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   id="outlined-multiline-static"
//                   required
//                   fullWidth
//                   label="Additional Info"
//                   name="additionalInfo"
//                   type="info"
//                   multiline
//                   rows={4}
//                   helperText={additionalInfoError}
//                   error={Boolean(additionalInfoError)}
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox value="allowExtraEmails" color="primary" />
//                   }
//                   label="I want to receive inspiration, marketing promotions and updates via email."
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Register
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 {/* <Link href="/login" variant="body2">
//                   Already have an account? Login
//                 </Link> */}
//                 <Link to="/login">Already have an account? Login</Link>
//               </Grid>
//             </Grid>
//           </Box>
//           {err && <span>Something went wrong</span>}
//         </Box>
//         <Footer />
//       </Container>
//     </ThemeProvider>
//   );
// };