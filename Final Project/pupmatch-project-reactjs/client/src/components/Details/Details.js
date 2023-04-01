import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useStyles from "../../styles";

import { Header } from "../Header/Header";

import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';


export const Details = () => {
  const [card, setCard] = useState({}); // Storing the data of a single doc
  const { uid } = useParams();

  const classes = useStyles();

  // const getUser = async () => {
  //   console.log('works');
    
    
  //   const q = query(
  //     collection(db, "users"),
  //     where("uid", "==", uid)
  //   )

  //   const querySnapshot = await getDocs(q);
  //   querySnapshot.forEach((doc) => {
  //     console.log(doc.data());

  //     setCard(doc.data());
  //   })
  //   console.log(card);
  // };

  useEffect(() => {
    const getUser = async () => {
      console.log('works');
      
      
      const q = query(
        collection(db, "users"),
        where("uid", "==", uid)
      )
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.data());
  
        setCard(doc.data());
      })
      console.log(card);
    };
    getUser();
  }, []);
  
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
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {card.firstName}
              </Typography>
              <Typography variant="h6">
                    {card.gender?.toUpperCase()}
              </Typography>
              <Typography >
                    {card.city}, {card.country}
                   
              </Typography>
             
              <Typography variant="body2" color="text.secondary">
              {card.additionalInfo}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">Message</Button>
            </CardActions>
          </Card>
        
      </Container>
    </>
  );
};
