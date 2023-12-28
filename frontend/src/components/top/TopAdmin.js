// Imported Icon
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess } from "../../redux/authSlice";

import { createAxios } from "../../utils/createInstance";
import { apiAuth, logoutUser } from "../../redux/apiRequest";
import pathRoutes from "../../utils/pathRoutes";


const TopAdmin = ({ isShowSidebar, setIsShowSidebar }) => {
    const navigate = useNavigate();
    const path = useLocation();
    const arrPath = path?.pathname?.split("/")?.splice(1, 2);
    const currentUser = useSelector((state) => state.auth.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);

    // console.log(path, arrPath[2]);
    const logoutHandle = async () => {
        if (currentUser.accessToken) {
            // axiosJWT.post()
            apiAuth.logoutUser(currentUser, dispatch, navigate, axiosJWT);
        }
    };
    // console.log(
    //     routes
    //         .filter((route) => route.role == currentUser?.roleId)[0]
    //         ?.pages?.filter((route) => route.path == arrPath[1]),
    //     currentUser?.roleId
    // );
    const routeNameLv1 = routes
        .filter((route) => route.role == currentUser?.roleId)[0]
        ?.pages?.filter((route) => route.path == arrPath[1])[0];
    return (
        <div className="topDiv flex justify-between items-center">
            <div className="leftDiv font-medium">
                <div className="aboveDiv flex items-center overflow-hidden">
                    <span className="text-greyText hover:text-HoverColor">
                        <Link to={`/${arrPath[0]}`}>Dashboard</Link>
                    </span>
                    {arrPath[1] && (
                        <span className="flex justify-center items-center ">
                            <FaChevronRight className="icon mx-1" />
                            <Link
                                to={`/${arrPath[0]}/${arrPath[1]}`}
                                relative="route"
                                className="hover:text-HoverColor"
                            >
                                {routeNameLv1?.name}
                            </Link>
                        </span>
                    )}
                </div>
                <div className="underDiv font-semibold">
                    <span className="">
                        {routeNameLv1?.name ? routeNameLv1?.name : "Home"}
                    </span>
                </div>
            </div>
            <div className="rightDiv flex gap-2">
                <button
                    className="navDiv hidden media-max-lg:flex button"
                    onClick={() => {
                        setIsShowSidebar(!isShowSidebar);
                    }}
                >
                    <IoMdMenu />
                </button>
                {/* <button className="signoutDiv button" onClick={logoutHandle}>
                    <span>SIGN OUT</span>
                    <MdLogout className="icon" />
                </button> */}
                {/* <Link to={"/login"} className="signinDiv button">
                    <span>SIGN IN</span>
                    <BsPersonCircle className="icon" />
                </Link> */}
                <div className="optionDiv inline-block relative group">
                    {/* <button className="button">
                        <span>SETTINGS</span>
                        <IoMdSettings className="icon" />
                    </button> */}
                    <button
                        id="dropdownDefaultButton"
                        class="button"
                        type="button"
                    >
                        <span>Cài đặt</span>
                        <IoMdSettings className="icon" />
                    </button>
                    <div
                        id="dropdown"
                        class="z-10 hidden group-hover:inline-block absolute right-0 bg-white w-44 rounded-lg shadow whitespace-nowrap"
                    >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <Link
                                    to={pathRoutes.R1.changeInformation}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Đổi thông tin
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={pathRoutes.R1.changePassword}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Đổi mật khẩu
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        logoutHandle();
                                    }}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Đăng xuất
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopAdmin;
