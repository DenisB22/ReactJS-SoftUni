import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { deleteMessage, updateMessage } from "../../services/chatService";

import { Button } from "@mui/material";

import useStyles from "../../styles";

export const Message = ({
    message,
}) => {

    const { currentUser } = useContext(AuthContext);
    const { data } = useContext(ChatContext);

    const [isEditing, setIsEditing] = useState(false);
    const [editedText, setEditedText] = useState(message.text);

    const ref = useRef();

    const classes = useStyles();

    useEffect(() => {
        ref.current?.scrollIntoView({ behavior: "smooth" })
    }, [message]);

    const handleEdit = async () => {
        if (editedText.trim() === "") return;
        await updateMessage(message.id, { text: editedText });
        setIsEditing(false);
    };

    const handleDelete = async () => {
        await deleteMessage(message.id);
    };

    return (
        <div ref={ref} className={`message ${message.senderId === currentUser.uid && "owner"}`}>
            <div className="messageInfo">
                <img src={
                    message.senderId === currentUser.uid
                        ? currentUser.photoURL
                        : data.user.photoURL
                }
                     alt="" />
                <span>Just Now</span>
            </div>
            <div className="messageContent">
                {isEditing ? (
                    <>
                        <input type="text" value={editedText} onChange={(e) => setEditedText(e.target.value)} />
                        <Button onClick={handleEdit}>Save</Button>
                    </>
                ) : (
                    <>
                        <p>{message.text}</p>
                        {message.img && <img src={message.img} alt="ok" />}
                        {message.senderId === currentUser.uid && (
                            <>
                                <Button style={{ minWidth: "10px" }} onClick={() => setIsEditing(true)}>Edit</Button>
                                <Button style={{ minWidth: "10px" }} onClick={handleDelete}>Delete</Button>
                            </>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
