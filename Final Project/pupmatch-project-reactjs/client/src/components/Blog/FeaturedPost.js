import * as React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";


import { DetailsPost } from "./DetailsPost";

import useStyles from "../../styles";

import { Link } from 'react-router-dom';

function FeaturedPost(props) {
  const { post, setFeaturedPosts } = props;
  
  const classes = useStyles();

  return (
    <Grid item xs={12} md={6}>
      <CardActionArea component="a" href="#">
        <Card sx={{ display: "flex" }}>
          <CardContent sx={{ flex: 1 }}>
            <Typography component="h2" variant="h5">
              {post && post.title}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary">
              {post && post.date}
            </Typography>
            <Typography variant="subtitle1" paragraph>
              {post &&
                post.content
                  .split(" ")
                  .slice(0, Math.ceil(post.content.split(" ").length / 2))
                  .join(" ")}...
            </Typography>
            <Typography variant="subtitle1" color="primary">
              {/* <DetailsPost setFeaturedPosts={setFeaturedPosts}>
                Continue reading...
              </DetailsPost> */}
              <Link to={`post-details/${post.id}`}>Continue reading...</Link>
              
            </Typography>
          </CardContent>
          {/* <CardMedia
            component="img"
            sx={{ width: 160, display: { xs: 'none', sm: 'block' } }}
            // image={post.image}
            // alt={post.imageLabel}
          /> */}
        </Card>
      </CardActionArea>
    </Grid>
  );
}

FeaturedPost.propTypes = {
  post: PropTypes.shape({
    date: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    //image: PropTypes.string.isRequired,
    //imageLabel: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
};

export default FeaturedPost;
