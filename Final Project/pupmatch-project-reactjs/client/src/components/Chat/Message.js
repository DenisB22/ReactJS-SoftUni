import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";

import { TextField } from "@mui/material";
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
  const [isEditing, setIsEditing] = useState(false);
  const [updatedText, setUpdatedText] = useState(message.text);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  useEffect(() => {
    if (!isEditing) {
      setUpdatedText(message.text);
    }
  }, [isEditing, message.text]);

  const handleDelete = async (message) => {
    if (message.senderId === currentUser.uid) {
      // (currentUser);
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
              userChatsDocSnapshot.data()[chatDocSnapshot.id]?.lastMessage;
            if (lastMessage && lastMessage.id === message.id) {
              // Update the lastMessage field to the previous message in the messages array
              const previousMessage =
                updatedMessages.length - 1 > 0
                  ? updatedMessages[updatedMessages.length - 1]
                  : "";
              const userChatsDocRef = doc(
                db,
                "userChats",
                userChatsDocSnapshot.id
              );
              await updateDoc(userChatsDocRef, {
                [chatDocSnapshot.id + ".lastMessage"]: previousMessage,
              });
            }
          });
        }
      });
    }
  };

  const handleEdit = async () => {
    setIsEditing(false);

    // Update the message in the `chats` collection
    const chatQuerySnapshot = await getDocs(collection(db, "chats"));
    chatQuerySnapshot.forEach(async (chatDocSnapshot) => {
      const messages = chatDocSnapshot.data().messages;
      const updatedMessages = messages.map((msg) => {
        if (msg.id === message.id) {
          return { ...msg, text: updatedText };
        } else {
          return msg;
        }
      });

      const chatDocRef = doc(db, "chats", chatDocSnapshot.id);
      await updateDoc(chatDocRef, { messages: updatedMessages });

      // Check if the lastMessage ID matches the ID of the message being edited
      const userChatsQuerySnapshot = await getDocs(collection(db, "userChats"));
      userChatsQuerySnapshot.forEach(async (userChatsDocSnapshot) => {
        console.log(userChatsDocSnapshot.data());
        const chatData = userChatsDocSnapshot.data()[chatDocSnapshot.id];
        const lastMessage = chatData.lastMessage;
        if (lastMessage && lastMessage.id === message.id) {
          // Update the text of the lastMessage
          const userChatsDocRef = doc(db, "userChats", userChatsDocSnapshot.id);
          await updateDoc(userChatsDocRef, {
            [chatDocSnapshot.id + ".lastMessage.text"]: updatedText,
          });
        }
      });
    });
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
        {isEditing ? (
          <div>
            <TextField
              value={updatedText}
              onChange={(e) => setUpdatedText(e.target.value)}
            />
            <Button onClick={handleEdit}>Save</Button>
          </div>
        ) : (
          <p>
            {message.text}
            <Button
              style={{ minWidth: "10px" }}
              onClick={() => handleDelete(message)}
            >
              x
            </Button>
            <Button
              style={{ minWidth: "10px" }}
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
          </p>
        )}
        {message.img && <img src={message.img} alt="ok" />}
      </div>
    </div>
  );
};
