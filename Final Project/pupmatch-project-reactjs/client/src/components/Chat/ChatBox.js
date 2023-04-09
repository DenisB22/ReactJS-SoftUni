import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

import './style.scss';

export const ChatBox = ({card, clearChat, updateClearChatState}) => {
    // console.log(`card from ChatBox: ${card}`);
    // console.log(`card from ChatBox: ${JSON.stringify(card)}`);

    return (
        <div className="chatBox">
            <div className="container">
                <Sidebar />
                <Chat card={card} clearChat={clearChat} updateClearChatState={updateClearChatState} />
            </div>
        </div>
    );
};