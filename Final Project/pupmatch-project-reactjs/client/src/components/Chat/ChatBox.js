import { Chat } from "./Chat";
import { Sidebar } from "./Sidebar";

import './style.scss';

export const ChatBox = () => {
    return (
        <div className="chatBox">
            <div className="container">
                <Sidebar />
                <Chat />
            </div>
        </div>
    );
};