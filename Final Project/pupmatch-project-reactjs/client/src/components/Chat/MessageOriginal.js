import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import { Button } from "@mui/material";
import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";

export const Message = ({ message }) => {
  // console.log(message);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  

  const handleDelete = async (message) => {
    if (message.senderId === currentUser.uid) {
      // console.log(currentUser);
      // console.log(message);

      // Deleting the message from the `chats` collection
      const chatQuerySnapshot = await getDocs(collection(db, "chats"));
      chatQuerySnapshot.forEach(async (chatDocSnapshot) => {
        const messages = chatDocSnapshot.data().messages;
        const updatedMessages = messages.filter((msg) => msg.id !== message.id);
        if (updatedMessages.length !== messages.length) {
          // If a message was removed, update the document in Firestore
          const chatDocRef = doc(db, "chats", chatDocSnapshot.id);
          await updateDoc(chatDocRef, { messages: updatedMessages });

          // Check if the lastMessage ID matches the ID of the message being deleted
          const userChatsQuerySnapshot = await getDocs(
            collection(db, "userChats")
          );
          userChatsQuerySnapshot.forEach(async (userChatsDocSnapshot) => {
            const lastMessage =
              userChatsDocSnapshot.data()[chatDocSnapshot.id].lastMessage;
            if (lastMessage && lastMessage.id === message.id) {
              // Delete the lastMessage field
              const userChatsDocRef = doc(
                db,
                "userChats",
                userChatsDocSnapshot.id
              );
              await updateDoc(userChatsDocRef, {
                [chatDocSnapshot.id + ".lastMessage"]: null,
              });
            }
          });
        }
      });
    }
  };

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === currentUser.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === currentUser.uid
              ? currentUser.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        <span>Just Now</span>
      </div>
      <div className="messageContent">
        <p>
          {message.text}
          <Button
            style={{ minWidth: "10px" }}
            onClick={() => handleDelete(message)}
          >
            x
          </Button>
          <Button style={{ minWidth: "10px" }}>Edit</Button>
        </p>
        {message.img && <img src={message.img} alt="ok" />}
      </div>
    </div>
  );
};
