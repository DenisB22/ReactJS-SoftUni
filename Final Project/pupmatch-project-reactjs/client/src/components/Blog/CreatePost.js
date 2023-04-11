import * as React from "react";

import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TextField from "@mui/material/TextField";

import useStyles from "../../styles";

import { AuthContext } from "../../context/AuthContext";

import { useParams, useNavigate, Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";

import { v4 as uuid } from "uuid";
import { format } from 'date-fns';


import { db } from "../../firebase";
import {
  collection,
  doc,
  deleteDoc,
  getDocs,
  query,
  where,
  getDoc,
  setDoc,
  updateDoc,
  serverTimestamp,
  arrayUnion,
  Timestamp,
} from "firebase/firestore";

import Header from "./Header";

export const CreatePost = () => {
  

  const { currentUser } = useContext(AuthContext);

  const classes = useStyles();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("handleSubmit");

    const data = new FormData(event.currentTarget);

    const title = data.get("title");
    const content = data.get("postContent");

    const postId = uuid();

    console.log(title);
    console.log(content);

    const currentUserUid = currentUser.uid;

    try {
      const res = await getDoc(doc(db, "blogPosts", postId));
      console.log('Hi!');

      if (!res.exists()) {

        const date = Timestamp.now().toDate();
        const formattedDate = format(date, 'MMMM d, yyyy');
        console.log(formattedDate);
        console.log('Hi!')


        await setDoc(doc(db, "blogPosts", postId), {
          id: postId,
          title,
          content,
          creator: currentUserUid,
          // date: serverTimestamp()
          date: formattedDate,
        });
      }

      // await updateDoc(doc(db, "blogPosts", currentUserUid), {
      //   posts: arrayUnion({
      //     id: uuid(),
      //     title,
      //     content,
      //     // date: serverTimestamp()
      //     date: Timestamp.now(),
      //   }),
      // });

      navigate('/blog');
    } catch (err) {
      <span>Something went wrong</span>;
    }
  };

  return (
    <>
      <Header title="" sections={[{ title: "", url: "#" }]} />
      <CssBaseline />
      <Container maxWidth="md" className={classes.cardContainer}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <PostAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Blog Post
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="title"
                  label="Post's Title"
                  name="title"
                  autoComplete="title"
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="outlined-multiline-static"
                  required
                  fullWidth
                  label="Post's Content"
                  name="postContent"
                  type="content"
                  multiline
                  rows={4}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Create
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                {/* <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link> */}
              </Grid>
            </Grid>
          </Box>
          {/* {err && <span>Something went wrong</span>} */}
        </Box>
      </Container>
    </>
  );
};
