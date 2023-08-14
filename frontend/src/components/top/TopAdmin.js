// Imported Icon
import { IoMdMenu, IoMdSettings } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { routes } from "../../routes";
import { useDispatch, useSelector } from "react-redux";
import { logginSuccess, logoutSuccess } from "../../redux/authSlice";
import axios from "axios";

import jwt_decode from "jwt-decode";

const TopAdmin = ({ isShowSidebar, setIsShowSidebar }) => {
    const currentUser = useSelector((state) => state.auth.login.currentUser);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useLocation();
    const arrPath = path.pathname.split("/").splice(1, 2);
    let axiosJWT = axios.create();

    // console.log(path, arrPath[2]);
    const refreshToken = async () => {
        try {
            const res = await axios.post(
                "/api/auth/refresh",
                {
                    withCredentials: true,
                }
            );
            return res.data;
        } catch (err) {
            console.log(err);
        }
    };
    axiosJWT.interceptors.request.use(
        async (config) => {
            const decodedToken = jwt_decode(currentUser.accessToken);
            if (decodedToken.exp < new Date().getTime() / 1000) {
                const data = await refreshToken();
                const refreshUser = {
                    ...currentUser.user,
                    accessToken: data.accessToken,
                };
                console.log("refreshUser", refreshUser);
                dispatch(logginSuccess(refreshUser));
                config.headers["token"] = "Bearer " + data.accessToken;
            }
            return config;
        },
        (err) => {
            return Promise.reject(err);
        }
    );

    const logoutHandle = async () => {
        if (currentUser.accessToken) {
            axiosJWT
                .post(
                    "/api/auth/logout",
                    {},
                    {
                        headers: {
                            token: `Bearer ${currentUser.accessToken}`,
                        },
                    }
                )
                .then((res) => {
                    console.log("res success", res);
                    dispatch(logoutSuccess());
                    navigate("/login");
                })
                .catch((res) => {
                    console.log("res cacth", res);
                });
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
                <button className="navDiv hidden media-max-lg:flex button">
                    <IoMdMenu
                        onClick={() => {
                            setIsShowSidebar(!isShowSidebar);
                        }}
                    />
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
                        <span>Settings</span>
                        <IoMdSettings className="icon" />
                    </button>
                    <div
                        id="dropdown"
                        class="z-10 hidden group-hover:inline-block absolute right-0 bg-white rounded-lg shadow w-44"
                    >
                        <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
                            <li>
                                <Link
                                    to={""}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Update Information
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to={""}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Change Password
                                </Link>
                            </li>
                            <li>
                                <Link
                                    onClick={() => {
                                        logoutHandle();
                                    }}
                                    class="block px-4 py-2 font-medium text-textColor hover:bg-gray-100"
                                >
                                    Sign out
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
