import { Link, Outlet } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io";
import { useState } from "react";
import { MdTopic } from "react-icons/md";
import { BsPersonCircle } from "react-icons/bs";
import TopHome from "../top/TopHome";

const HomeLayout = () => {
    const [showNav, setShowNav] = useState(false);
    return (
        <div className="containerDiv relative w-screen h-screen top-0 left-0 right-0 justify-center items-center bg-bgColor overflow-auto">
            <TopHome />
            <div className="navDiv relative bg-gradient-to-r from-HoverColor via-PrimaryColor to-HoverColor p-2 flex flex-col gap-2">
                <div className="flex justify-end items-center media-min-md:hidden">
                    <button
                        className="button"
                        onClick={() => {
                            setShowNav(!showNav);
                        }}
                    >
                        <IoMdMenu className="" />
                    </button>
                </div>
                <div
                    className={`itemNav flex media-max-md:flex-col justify-center items-center gap-2 media-max-md:${
                        showNav ? "flex" : "hidden"
                    }`}
                >
                    <Link to={""} className="button media-max-md:w-full">
                        <span className="title">Trang chủ</span>
                        <FaHome className="icon" />
                    </Link>
                    <Link
                        to={"list-topic"}
                        className="button media-max-md:w-full"
                    >
                        <span className="title">Danh sách đề tài</span>
                        <MdTopic className="icon" />
                    </Link>
                    <Link to={"login"} className="button media-max-md:w-full">
                        <span className="title">Đăng nhập</span>
                        <BsPersonCircle className="icon" />
                    </Link>
                </div>
            </div>
            <div className="homeDiv h-full w-full flex justify-center items-start px-2 py-8">
                <Outlet />
            </div>
        </div>
    );
};

export default HomeLayout;
