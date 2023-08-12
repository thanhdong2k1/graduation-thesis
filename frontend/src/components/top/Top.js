// Imported Icon
import { IoMdMenu } from "react-icons/io";
import { BsPersonCircle } from "react-icons/bs";
import { Link, useLocation, useNavigate, useRoutes } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";
import { MdLogout } from "react-icons/md";
import { routes } from "../../routes";
import { useDispatch } from "react-redux";
import { logoutSuccess } from "../../redux/authSlice";

const Top = ({ isShowSidebar, setIsShowSidebar }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const path = useLocation();
    const arrPath = path.pathname
        .split("/")
        .splice(1, 2)
        .filter((path) => isNaN(+path));
    console.log(path, arrPath);

    const logoutHandle = () => {
        dispatch(logoutSuccess());
        navigate("/login");
    };
    // const routeNameLv1= (routes.routes.filter((router)=>router.path=="admin")[0]?.children)?.filter((router)=>router.path==arrPath[1])[0]?.id

    // const routeNameLv1= (routes.routes.filter((router)=>router.path=="admin")[0]?.children)?.filter((router)=>router.path==arrPath[1])[0]?.id
    // const routeNameLv2 =((routes.routes.filter((router)=>router.path=="admin")[0]?.children)?.filter((router)=>router.path==arrPath[1])[0]?.children)?.filter((router)=>router.path==arrPath[2]||(!isNaN(+arrPath[2])&&router.path==":id"))[0]?.id
    return (
        <div className="topDiv flex justify-between items-center">
            <div className="leftDiv ">
                {/* <div className="aboveDiv flex items-center overflow-hidden">
                    <span><Link to={`/${arrPath[0]}`}>Dashboard</Link></span>
                    <FaChevronRight className="icon mx-2"/>
                    <span><Link to={`/${arrPath[0]}/${arrPath[1]?arrPath[1]:""}`} relative="route">{routeNameLv1?routeNameLv1:"Home"}</Link></span>
                    {arrPath[2]&&<FaChevronRight className="icon mx-2"/>}
                    <span><Link to={`/${arrPath[0]}/${arrPath[1]?arrPath[1]:""}/${arrPath[2]?arrPath[2]:""}`} relative="route">{routeNameLv2}</Link></span>
                </div>
                <div className="underDiv">
                    <span>{routeNameLv2?routeNameLv2:routeNameLv1?routeNameLv1:"Home"}</span>
                </div> */}
                {/* <div class="max-w-md">
                    <ul class="flex items-center">
                        {splitPath.map((item,index)=>(
                            index=="0"?"":
                            <li key={index} class="flex items-center overflow-hidden">
                                {index=="1"&& splitPath.at(-1)?"":<FaChevronRight className="icon"/>}
                                <Link to={`../${item}`} relative="path" >{item} {index}</Link>
                            </li>
                        ))}
                    </ul>
                </div> */}
            </div>
            <div className="rightDiv flex gap-2">
                <button className="navDiv hidden media-max-lg:flex button">
                    <IoMdMenu
                        // className="media-max-xl:hidden media-max-lg:flex media-max-lg:items-end"
                        onClick={() => {
                            setIsShowSidebar(!isShowSidebar);
                        }}
                    />
                </button>
                <button className="signoutDiv button" onClick={logoutHandle}>
                    <span>SIGN OUT</span>
                    <MdLogout className="icon" />
                </button>
                {/* <Link to={"/login"} className="signinDiv button">
                    <span>SIGN IN</span>
                    <BsPersonCircle className="icon" />
                </Link> */}
            </div>
        </div>
    );
};

export default Top;
