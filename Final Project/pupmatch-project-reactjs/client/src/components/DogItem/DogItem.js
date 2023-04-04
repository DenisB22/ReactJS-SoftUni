import * as React from "react";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

import { useContext } from "react";
import { Link } from 'react-router-dom';

import useStyles from "../../styles";

import { AuthContext } from "../../context/AuthContext";

export const DogItem = ({ cards }) => {
  const { currentUser } = useContext(AuthContext);
  
  const classes = useStyles();

  return (
    <>
      <Container sx={{ py: 8 }} maxWidth="md">
        {/* End hero unit */}
        <Grid container spacing={4}>
          {cards.map((card) => (
            <Grid id={card.uid} item key={card} xs={12} sm={6} md={4}>
              
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardMedia
                  className={classes.imageContainer}
                  component="img"
                  sx={{
                    // 16:9
                    pt: "56.25%",
                  }}
                  // image="https://source.unsplash.com/random"
                  // image={card.imageUrl}
                  image={card.photoURL}
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography gutterBottom variant="h4" component="h2">
                    {card.firstName}
                  </Typography>
                  {/* <Typography variant="h6">
                    {card.gender.toUpperCase()}
                  </Typography> */}
                  <Typography>
                    {card.breed}
                  </Typography>
                  {/* <Typography >
                    {card.city}, {card.country}
                  </Typography> */}
                  
                </CardContent>
                <CardActions>
                  {/* <Button size="small" href="/details">View</Button> */}
                  <Button size="small">
                    {/* <Link to={`/details/${card.uid}`} className={classes.detailsLink} card={card}> */}
                    <Link to={`/details/${card.uid}`} className={classes.detailsLink}>
                      View
                    </Link>
                  </Button>
                  <Button size="small">
                    { 
                    (currentUser && currentUser.uid === card.uid) &&  
                    <Link to={`edit/${card.uid}`} className={classes.editLink}>
                      Edit
                    </Link>
                    }
                  </Button>
                </CardActions>
              </Card>
              
            </Grid>
          ))}
        </Grid>
      </Container>
      {cards.length === 0 && (
                <Box
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                sx={{
                  bgcolor: "background.paper",
                  pt: 8,
                  pb: 6,
                }}
              >
                <Container maxWidth="sm"
                >
                  <Typography
                    component="h1"
                    variant="h3"
                    align="center"
                    color="text.secondary"
                    gutterBottom
                  >
                    No Puppies yet
                  </Typography>
                  
                </Container>
              </Box>
            )}
    </>
  );
};
