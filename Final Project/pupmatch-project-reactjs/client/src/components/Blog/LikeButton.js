import { collection, doc, getDoc, setDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

import Typography from "@mui/material/Typography";

import Button from "@mui/material/Button";

// Create a reference to the "likes" collection in your database

export const LikeButton = ({ postId, userId, onLikesChange }) => {
  const [liked, setLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const getLikes = async () => {
    const docRef = doc(db, "likes", postId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const likesData = docSnap.data();
      setLikes(likesData.likes);
    }
  };

  const handleLike = async () => {
    const res = await getDoc(doc(db, "likes", postId));
   
    // Add or update the user's like for the post
    if (!res.exists()) {
      
      await setDoc(doc(db, "likes", postId), {
        id: postId,
        likes: 1,
        likedBy: [userId],
      });

    } else {
        await updateDoc(doc(db, "likes", postId), {
            id: postId,
            likes: increment(1),
            likedBy: arrayUnion(userId)
          });
    }   
    getLikes();
    onLikesChange(likes + 1);
    setLiked(true);
  };

  const handleDislike = async() => {
   
    await updateDoc(doc(db, 'likes', postId), {
        id: postId,
        likes: increment(-1),
        likedBy: arrayRemove(userId),
    })
    getLikes();
    onLikesChange(likes - 1);
    setLiked(false);
  }

  useEffect(() => {
    getLikes();
  }, [likes]);

  return (
    <>
    <Button 
    variant="outlined" 
    onClick={liked ? handleDislike : handleLike}>
      {liked ? "Dislike" : "Like"}
    </Button>
    </>
  );
};
