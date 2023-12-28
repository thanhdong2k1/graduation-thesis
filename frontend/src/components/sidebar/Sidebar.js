import { Link, useLocation, useNavigate } from "react-router-dom";
import logoMini from "../../assets/logo_Mini.png";
import { IoMdSpeedometer } from "react-icons/io";
import { FaXmark } from "react-icons/fa6";
import { routes } from "../../routes";
import { useSelector } from "react-redux";
import pathRoutes from "../../utils/pathRoutes";
const Sidebar = ({ isShowSidebar, setIsShowSidebar }) => {
    const userData = useSelector((state) => state.auth.currentUser);
    const rolePath =
        userData?.roleId == "R1"
            ? "admin"
            : userData?.roleId == "R2"
            ? "dean"
            : userData?.roleId == "R3"
            ? "lecturer"
            : "";
    const path = useLocation();
    const routesAdmin = routes
        .filter((route) => route.role == userData?.roleId)[0]
        ?.pages?.filter(
            (route) =>
                route.path != pathRoutes.R1.changeInformation &&
                route.path != pathRoutes.R1.changePassword &&
                !route.name.includes("Add")&&
                !route.name.includes("Update")&&
                !route.name.includes("Detail")
        );
    // console.log("routesAdmin", routesAdmin,path?.pathname?.split("/") );
    return (
        <div
            onBlur={() => {
                setIsShowSidebar(false);
            }}
            className={`sidebarDiv w-60 h-full bg-whiteColor m-4 rounded-2xl overflow-auto shadow-xl shadow-greyText whitespace-nowrap ${
                isShowSidebar
                    ? "media-max-lg:absolute media-max-lg:z-10 media-max-lg:-left-0 media-max-lg:h-[calc(100%-2rem)]"
                    : "media-max-lg:hidden"
            } duration-300`}
        >
            <button
                className={`xMark button ${
                    isShowSidebar ? "media-min-lg:hidden" : "hidden"
                } absolute top-1 right-0 bg-transparent`}
            >
                <FaXmark
                    className=""
                    onClick={() => {
                        setIsShowSidebar(false);
                    }}
                />
            </button>
            <div
                className={`logoDiv flex items-center justify-between cursor-pointer p-6`}
            >
                <img
                    src={logoMini}
                    alt=""
                    className="max-w-[35px] p-1 bg-inputColor rounded-lg"
                />
                <h2 className="text-h3FontSize font-bold text-PrimaryColor text-center">
                    Phân hiệu Trường 
                    <br />
                    Đại học Thủy Lợi
                </h2>
            </div>
            <div className="menuDiv grid gap-4">
                <h2 className="text-h3FontSize font-bold text-blackColor text-center">
                    MENU NHANH
                </h2>
                <ul className="menuLists grid items-center gap-2 px-2 ">
                    {routesAdmin &&
                        routesAdmin.map((route, index) => (
                            <li
                                className={`listItem w-full relative text-greyText text-h3FontSize before:absolute before:content-[''] before:w-[5px] before:h-[0%] before:bg-PrimaryColor before:l-0 b-0 before:rounded-r-3xl group ${
                                    path?.pathname?.split("/")?.at(-1) ==
                                    route.path
                                        ? "before:h-full before:duration-300 before:ease-in-out before:bg-PrimaryColor text-PrimaryColor"
                                        : "hover:before:h-full hover:before:duration-300 hover:before:ease-in-out hover:before:bg-HoverColor hover:text-HoverColor"
                                }`}
                            >
                                <Link
                                    to={route.path}
                                    className={`flex items-center font-medium ml-4 ${
                                        path?.pathname?.split("/")?.at(-1) ==
                                        route.path
                                            ? " text-PrimaryColor"
                                            : "group-hover:text-HoverColor"
                                    } `}
                                >
                                    <IoMdSpeedometer className="icon mr-2" />
                                    <span className="">{route.name}</span>
                                </Link>
                            </li>
                        ))}
                    {/* <li
                        className={`listItem w-full relative text-greyText text-h3FontSize before:absolute before:content-[''] before:w-[5px] before:h-[0%] before:bg-PrimaryColor before:l-0 b-0 before:rounded-r-3xl group ${
                            path.pathname == "/abc"
                                ? ""
                                : "hover:before:h-full hover:before:duration-300 hover:before:ease-in-out hover:before:bg-HoverColor hover:text-HoverColor"
                        }`}
                    >
                        <a
                            href=""
                            className="flex items-center font-medium ml-4 group-hover:text-HoverColor"
                        >
                            <IoMdSpeedometer className="icon mr-2" />
                            <span className="">Dashboard</span>
                        </a>
                    </li>
                    <li
                        className={`listItem w-full relative text-greyText text-h3FontSize before:absolute before:content-[''] before:w-[5px] before:h-[0%] before:bg-PrimaryColor before:l-0 b-0 before:rounded-r-3xl group ${
                            path.pathname == "/admin"
                                ? "before:h-full before:duration-300 before:ease-in-out before:bg-PrimaryColor text-PrimaryColor"
                                : "hover:before:h-full hover:before:duration-300 hover:before:ease-in-out hover:before:bg-HoverColor hover:text-HoverColor"
                        }`}
                    >
                        <a
                            href=""
                            className={`flex items-center font-medium ml-4 ${
                                path.pathname == "/admin"
                                    ? " text-PrimaryColor"
                                    : "group-hover:text-HoverColor"
                            } `}
                        >
                            <IoMdSpeedometer className="icon mr-2" />
                            <span className="">Dashboard</span>
                        </a>
                    </li>
                    <li
                        className={`listItem w-full relative text-greyText text-h3FontSize before:absolute before:content-[''] before:w-[5px] before:h-[0%] before:bg-PrimaryColor before:l-0 b-0 before:rounded-r-3xl group ${
                            path.pathname == "/abc"
                                ? ""
                                : "hover:before:h-full hover:before:duration-300 hover:before:ease-in-out hover:before:bg-HoverColor hover:text-HoverColor"
                        }`}
                    >
                        <a
                            href=""
                            className="flex items-center font-medium ml-4 group-hover:text-HoverColor"
                        >
                            <IoMdSpeedometer className="icon mr-2" />
                            <span className="">Dashboard</span>
                        </a>
                    </li> */}
                </ul>
            </div>
        </div>
    );
};

export default Sidebar;
