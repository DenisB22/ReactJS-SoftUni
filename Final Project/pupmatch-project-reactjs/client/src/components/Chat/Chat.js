import { useContext } from 'react';
import { ChatContext } from '../../context/ChatContext';
import { InputMessage } from './InputMessage'
import { Messages } from "./Messages";

export const Chat = () => {
    const { data } = useContext(ChatContext);
    console.log(data);

    return (
        <div className="chat">
            <div className="chatInfo">
                <span>{data.user?.firstName}</span>
            </div>
            <Messages />
            <InputMessage />
        </div>
    );
};