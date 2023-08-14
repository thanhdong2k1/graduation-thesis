import { useState } from "react";
import Body from "../../body/Body";
import Sidebar from "../../sidebar/Sidebar";
import TopStudent from "../../top/TopStudent";

const StudentLayout = () => {
    const [isShowSidebar, setIsShowSidebar] = useState(false);
    return (
        <div className="containerDiv flex relative w-screen h-screen py-4 justify-center items-center bg-bgColor overflow-hidden">
            <TopStudent />
        </div>
    );
};

export default StudentLayout;
