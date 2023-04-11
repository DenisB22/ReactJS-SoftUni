import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useStyles from "../../styles";

import { AuthContext } from "../../context/AuthContext";
// import  AuthContext  from "../../context/AuthContext";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { Searchbar } from "../Chat/Searchbar";

export const CreatePost = () => {
  const [card, setCard] = useState({}); // Storing the data of a single doc
  const { uid } = useParams();

  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async(event) => {
    event.preventDefault();
    console.log('handleSubmit');
  };

  return (
    <>
      
      <CssBaseline />
      <Container maxWidth="md" className={classes.cardContainer}>
        <Card sx={{ maxWidth: 850 }}>
          <CardMedia
            sx={{ height: "52vh" }}
            image={card.photoURL}
            title="Dog Photo"
            style={{ backgroundSize: "cover" }}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Pesho
            </Typography>
            <Typography variant="h6">{card.gender?.toUpperCase()}</Typography>
            <Typography>Plovdiv, Bulgaria</Typography>

            <Typography variant="body2" color="text.secondary">
              Cool Dude
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="outlined"
              color="error"
              // onClick={() => deleteProfile(uid)}
            >
              Delete Profile
            </Button>
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
