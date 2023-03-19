import { Navbar } from "./Navbar";
import { Searchbar } from "./Searchbar";
import { Chats } from './Chats';

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <Navbar />
            <Searchbar />
            <Chats />
        </div>
    );
};