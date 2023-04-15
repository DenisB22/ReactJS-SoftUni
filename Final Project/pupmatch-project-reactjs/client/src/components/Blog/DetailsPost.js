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
  onSnapshot,
  getDoc,
} from "firebase/firestore";
import { Searchbar } from "../Chat/Searchbar";
import { LikeButton } from "./LikeButton";

export const DetailsPost = ({ setFeaturedPosts }) => {
  const [post, setPost] = useState({});
  const [likes, setLikes] = useState(0);
  const [author, setAuthor] = useState({});// Storing the data of a single doc
  const { id } = useParams();

  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const deletePost = async (id) => {
    setFeaturedPosts((prevFeaturedPosts) =>
      prevFeaturedPosts.filter((x) => x.id !== id)
    );

    await deleteDoc(doc(db, "blogPosts", id));
    navigate("/blog");
  };

  const handleLikesChange = (newLikes) => {
    setLikes(newLikes);
  };


  useEffect(() => {
    const getPost = async () => {
      // console.log("works");

      const q = query(collection(db, "blogPosts"), where("id", "==", id));

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());

        setPost(doc.data());
      });
      // console.log(card);
    };
    getPost();

  }, [id]);


  useEffect(() => {
    const getAuthor = async () => {
      // console.log("works");

      const q = query(
        collection(db, "users"),
        where("uid", "==", post.creator)
      );
      
      const querySnapshot = await getDocs(q);
      
      querySnapshot.forEach((doc) => {
        // console.log(doc.data());
        setAuthor(doc.data());
      });
      // console.log(card);
    };
    getAuthor();
  }, [id]);

  useEffect(() => {
    const getLikesCount = async (postId) => {
      const postRef = doc(db, "blogPosts", postId);
      const postDoc = await getDoc(postRef);
      if (postDoc.exists()) {
        const postData = postDoc.data();
        if (postData.likes) {
          setLikes(postData.likes.length);
        }
      }
    };
    if (id) {
      getLikesCount(id);
    }
  }, [likes]);

  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" className={classes.cardContainer}>
        <Card sx={{ maxWidth: 850 }}>
          {/* <CardMedia
              sx={{ height: "52vh" }}
              image={post.photoURL}
              title="Dog Photo"
              style={{ backgroundSize: "cover" }}
            /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {post.title}
            </Typography>
            <Typography>
              Author: {author.firstName} {author.lastName}
            </Typography>

            <Typography variant="body2" color="text.secondary">
              {post.content}
            </Typography>
            
            {likes > 0 && <Typography>
                  Likes: {likes}
            </Typography>}
          </CardContent>
          <CardActions>
            {currentUser && currentUser.uid === post.creator && (
              <>
                <Button variant="outlined">
                  <Link
                    to={`/edit-post/${id}`}
                    className={classes.editPostLink}
                  >
                    Edit Post
                  </Link>
                </Button>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => deletePost(id)}
                >
                  Delete Post
                </Button>
              </>
            )}
            {currentUser && currentUser.uid !== post.creator && ( 
              <LikeButton postId={id} userId={currentUser.uid} onLikesChange={handleLikesChange} />
            )}
            
          </CardActions>
        </Card>
      </Container>
    </>
  );
};
