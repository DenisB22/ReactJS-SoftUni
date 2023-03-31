import * as React from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { Header } from "../Header/Header";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import useStyles from "../../styles";

export const Details = () => {
  const classes = useStyles();

  return (
    <>
      <Header />
      <CssBaseline />
      <Container maxWidth="md" className={classes.cardContainer}>
          <Card sx={{ maxWidth: 850 }}>
            <CardMedia
              sx={{ height: "52vh" }}
              image="https://www.rover.com/blog/wp-content/uploads/top-boy-dog-names.jpg"
              title="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Lizard
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Lizards are a widespread group of squamate reptiles, with over
                6,000 species, ranging across all continents except Antarctica
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
