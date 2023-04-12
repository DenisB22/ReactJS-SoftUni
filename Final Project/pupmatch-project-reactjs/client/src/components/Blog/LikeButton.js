import { collection, doc, getDoc, setDoc, updateDoc, increment, arrayUnion, arrayRemove } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

import Button from "@mui/material/Button";

// Create a reference to the "likes" collection in your database

export const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);

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
    setLiked(true);
  };

  const handleDislike = async() => {
   
    await updateDoc(doc(db, 'likes', postId), {
        id: postId,
        likes: increment(-1),
        likedBy: arrayRemove(userId),
    })
    setLiked(false);
  }

  return (
    <Button 
    variant="outlined" 
    onClick={liked ? handleDislike : handleLike}>
      {liked ? "Dislike" : "Like"}
    </Button>
  );
};
