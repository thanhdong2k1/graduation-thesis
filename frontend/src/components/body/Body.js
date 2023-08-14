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
            <div className="mt-8 gap-8 items-start h-full w-full">
                <Outlet />
            </div>
        </div>
    );
};

export default Body;
