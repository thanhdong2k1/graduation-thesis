import { Outlet } from "react-router-dom";
import TopAdmin from "../top/TopAdmin";
import Sidebar from "../sidebar/Sidebar";

const Body = ({ isShowSidebar, setIsShowSidebar }) => {
    return (
        <div
            className={`mainContent relative w-[calc(100%-15rem)] media-max-lg:w-[calc(100%-1rem)] h-full p-4 overflow-auto`}
        >
            <TopAdmin
                isShowSidebar={isShowSidebar}
                setIsShowSidebar={setIsShowSidebar}
            />
            {/* Bọc body h-[calc(100%-5rem)]*/}
            <div className="mt-8 items-start h-[calc(100%-6rem)] w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Body;
