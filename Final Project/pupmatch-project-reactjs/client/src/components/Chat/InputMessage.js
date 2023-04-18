import Img from "../../images/image.png";
import Attach from "../../images/attach.png";
import { memo, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import {
  arrayUnion,
  collection,
  doc,
  getDocs,
  query,
  serverTimestamp,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { db, storage } from "../../firebase";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const InputMessage = ({card, clearChat, updateClearChatState}) => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const messageId = uuid();

  const handleSend = async () => {
    // console.log('triggered');
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);


      uploadTask.on(
        (error) => {
          // Handle unsuccessful uploads
          //   setErr(true);
          <span>Something went wrong</span>
        },
        () => {
          // Handle successful uploads on complete
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                // id: uuid(),
                id: messageId,
                text,
                senderId: currentUser.uid,
                date: Timestamp.now(),
                img: downloadURL,
              }),
            });
          });
        }
      );
    } else {
      await updateDoc(doc(db, "chats", data.chatId), {
        messages: arrayUnion({
          id: messageId,
          text,
          senderId: currentUser.uid,
          date: Timestamp.now(),
        }),
      });
    }
    // setText("");
    // setImg(null);

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        id: messageId,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId + ".lastMessage"]: {
        text,
        id: messageId,
      },
      [data.chatId + ".date"]: serverTimestamp(),
    });
    setText("");
    setImg(null);
  };

  useEffect(() => {
    if (!clearChat) {
      updateClearChatState(true);
      // console.log(clearChat);
      // console.log(Object.keys(card).length);
      // console.log(Object.keys(card));
      // console.log(card);
      const handleUserFromDetails = async() => {
        if (img) {
          const storageRef = ref(storage, uuid());
          const uploadTask = uploadBytesResumable(storageRef, img);
          // console.log(data.chatId);
    
          uploadTask.on(
            (error) => {
              <span>Something went wrong</span>
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    id: messageId,
                    text: 'Hello',
                    senderId: currentUser.uid,
                    date: Timestamp.now(),
                    img: downloadURL,
                  }),
                });
    
                await updateDoc(doc(db, "userChats", currentUser.uid), {
                  [data.chatId + ".lastMessage"]: {
                    text: 'Hello',
                    id: messageId,
                  },
                  [data.chatId + ".date"]: serverTimestamp(),
                });
    
                await updateDoc(doc(db, "userChats", card.uid), {
                  [data.chatId + ".lastMessage"]: {
                    text: 'Hello',
                    id: messageId,
                  },
                  [data.chatId + ".date"]: serverTimestamp(),
                });
              });
            }
          );
        } else {
          await updateDoc(doc(db, "chats", data.chatId), {
            messages: arrayUnion({
              id: messageId,
              text: 'Hello',
              senderId: currentUser.uid,
              date: Timestamp.now(),
            }),
          });
    
          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [data.chatId + ".lastMessage"]: {
              text: 'Hello',
              id: messageId,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
    
          await updateDoc(doc(db, "userChats", card.uid), {
            [data.chatId + ".lastMessage"]: {
              text: 'Hello',
              id: messageId,
            },
            [data.chatId + ".date"]: serverTimestamp(),
          });
        }
        setText("");
        setImg(null);
      }
      handleUserFromDetails();
    }
  }, [clearChat]);
  

  return (
    <div className="inputMessage">
      <input
        type="text"
        placeholder="Type something..."
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};


