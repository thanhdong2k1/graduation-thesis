import { useState } from "react";
import Body from "../../body/Body";
import Sidebar from "../../sidebar/Sidebar";

const AdminLayout = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    return (
        <div className="containerDiv flex relative w-screen h-screen py-4 justify-center items-center bg-bgColor overflow-hidden">
            <Sidebar
                isShowSidebar={isShowSidebar}
                setIsShowSidebar={setIsShowSidebar}
            />
            <Body
                isShowSidebar={isShowSidebar}
                setIsShowSidebar={setIsShowSidebar}
            />
        </div>
    );
};

export default AdminLayout;
