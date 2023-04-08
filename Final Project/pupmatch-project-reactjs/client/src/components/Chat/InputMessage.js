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

export const InputMessage = ({card}) => {
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
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
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
    // console.log(card);
    if (Object.keys(card).length > 0) {
      // console.log('Hello')
      // console.log(card.uid);
      const handleUserFromDetails = async() => {
        if (img) {
          console.log('img');
          const storageRef = ref(storage, uuid());
    
          const uploadTask = uploadBytesResumable(storageRef, img);
    
    
          uploadTask.on(
            (error) => {
              // Handle unsuccessful uploads
              //   setErr(true);
            },
            () => {
              // Handle successful uploads on complete
              // For instance, get the download URL: https://firebasestorage.googleapis.com/...
              getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                await updateDoc(doc(db, "chats", data.chatId), {
                  messages: arrayUnion({
                    // id: uuid(),
                    id: messageId,
                    text: 'Hello',
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
              text: 'Hello',
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
    
        await updateDoc(doc(db, "userChats", card.uid), {
          [data.chatId + ".lastMessage"]: {
            text,
            id: messageId,
          },
          [data.chatId + ".date"]: serverTimestamp(),
        });
        setText("");
        setImg(null);
      }
      handleUserFromDetails();
    }
  }, [card.uid]);
  

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


