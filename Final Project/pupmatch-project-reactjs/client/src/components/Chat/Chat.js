import { InputMessage } from './InputMessage'
import { Messages } from "./Messages";

export const Chat = () => {
    return (
        <div className="chat">
            <div className="chatInfo">
                <span>Jane</span>
            </div>
            <Messages />
            <InputMessage />
        </div>
    );
};