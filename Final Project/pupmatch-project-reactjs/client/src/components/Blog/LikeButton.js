import { collection, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { db } from "../../firebase";

import Button from "@mui/material/Button";

// Create a reference to the "likes" collection in your database

export const LikeButton = ({ postId, userId }) => {
  const [liked, setLiked] = useState(false);

  // Check if the user has already liked the post
  //   useEffect(() => {
  //     if (likesCollectionRef) {
  //       likesCollectionRef
  //         .doc(postId)
  //         .get()
  //         .then((doc) => {
  //           if (doc.exists) {
  //             const likedBy = doc.data().likedBy || {};
  //             setLiked(likedBy[userId] || false);
  //           }
  //         });
  //     }
  //   }, [postId, userId]);

  const handleLike = async () => {
    const res = await getDoc(doc(db, "likes", postId));
    console.log(res);
    // Add or update the user's like for the post
    if (!res.exists()) {
      console.log("res does not exist");
      await setDoc(doc(db, "likes", postId), {
        id: postId,
        likes: 1,
        likedBy: [userId],
      });

      // likesCollectionRef.doc(postId).set(
      //   {
      //     postId: postId,
      //     likedBy: { [userId]: true },
      //     likesCount: FieldValue.increment(1),
      //   },
      //   { merge: true }
      // );
      setLiked(true);
    }
  };

  function handleDislike() {
    // Remove the user's like for the post
    // likesCollectionRef.doc(postId).update({
    //   [`likedBy.${userId}`]: FieldValue.delete(),
    //   likesCount: FieldValue.increment(-1),
    // });
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
