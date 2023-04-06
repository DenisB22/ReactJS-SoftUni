import { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthContext } from "../../context/AuthContext";

export const Searchbar = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    // console.log("I am in");
    const q = query(
      collection(db, "users"),
      where("firstName", "==", username)
     
    );
    // console.log("passed");

    try {
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUser(doc.data());
        // console.log(doc.data());
        // console.log(doc.data().uid);
        // console.log("no errors");
      });
    } catch (err) {
      // console.log("error");
      setErr(true);
    }
  };

  // console.log(user);
  // console.log(currentUser.displayName);
  // console.log(currentUser.photoURL);

  const handleKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
    // e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async () => {
    // check whether the group(chats in firestore) exists, if not create
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    
    // console.log(combinedId);

    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      // console.log(user);

      if (!res.exists()) {
        // create a chat in chats collection
        await setDoc(doc(db, "chats", combinedId), { messages: [] });

        // create user chats
        
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            firstName: user.firstName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            // firstName: currentUser.firstName,
            firstName: currentUser.dislayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        
      }
    } catch (err) {}

    setUser(null);
    setUsername("");

    // create user chats
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="Find a user"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
      </div>
      {err && <span>User not found</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="" />
          <div className="userChatInfo">
            <span>{user.firstName}</span>
          </div>
        </div>
      )}
    </div>
  );
};
