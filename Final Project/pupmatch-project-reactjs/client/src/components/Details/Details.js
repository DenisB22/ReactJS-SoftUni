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

import { Header } from "../Header/Header";
import { AuthContext } from "../../context/AuthContext";

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

export const Details = ({ setCards, sendData }) => {
  const [card, setCard] = useState({}); // Storing the data of a single doc
  const { uid } = useParams();

  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const deleteProfile = async (uid) => {
    setCards((prevCards) => prevCards.filter((x) => x.uid !== uid));

    await deleteDoc(doc(db, "users", uid));
    navigate("/");
    signOut(auth);
  };

  function handleClick() {
    sendData(card);
  }


  useEffect(() => {
    const getUser = async () => {
      // console.log("works");

      const q = query(collection(db, "users"), where("uid", "==", uid));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());

        setCard(doc.data());
      });
      // console.log(card);
    };

    
    getUser();
  }, [uid]);


  return (
    // <>
    //   <Header />
    //   <CssBaseline />
    //   <Container maxWidth="md" className={classes.cardContainer}>
    //       <Card sx={{ maxWidth: 850 }}>
    //         <CardMedia
    //           sx={{ height: "52vh" }}
    //           // image="https://www.rover.com/blog/wp-content/uploads/top-boy-dog-names.jpg"
    //           image={card.photoURL}
    //           title="green iguana"
    //         />
    //         <CardContent>
    //           <Typography gutterBottom variant="h5" component="div">
    //             {card.firstName}
    //           </Typography>
    //           <Typography variant="h6">
    //                 {card.gender.toUpperCase()}
    //           </Typography>
    //           <Typography >
    //                 {card.city}, {card.country}
    //           </Typography>

    //           <Typography variant="body2" color="text.secondary">
    //           {card.additionalInfo}
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button size="small">Message</Button>
    //         </CardActions>
    //       </Card>

    //   </Container>
    // </>
    <>
      <Header />
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
              {card.firstName}
            </Typography>
            <Typography variant="h6">{card.gender?.toUpperCase()}</Typography>
            <Typography>
              {card.city}, {card.country}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {card.additionalInfo}
            </Typography>
          </CardContent>
          <CardActions>
            {/* <Button size="small">Message</Button> */}
            {
            card.uid !== currentUser.uid && 
            <Link to="/messages" className={classes.messagesLink} onClick={handleClick}>
                    Message
            </Link>
            }
            
            {currentUser && currentUser.uid === card.uid && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => deleteProfile(uid)}
              >
                Delete Profile
              </Button>
            
            )}
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
