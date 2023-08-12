import { FaUserShield } from "react-icons/fa6";
import backgroundImage from "../../assets/background.png";
import logoMini from "../../assets/logo_Mini.png";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { logginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
const CardAuth = () => {
    const dispatch = useDispatch();

    const userData = useSelector((state) => state.auth.login.currentUser);
    const rolePath =
        userData?.roleId == "R1"
            ? "admin"
            : userData?.roleId == "R2"
            ? "secretary"
            : userData?.roleId == "R3"
            ? "lecturer"
            : "";
    console.log(rolePath);
    const [email, setEmail] = useState(null);
    const [password, setPassword] = useState(null);

    const navigate = useNavigate();
    // useEffect(() => {
    //     console.log(rolePath);
    //     if (rolePath == "") {
    //         console.log("Đã vào");
    //         // navigate(rolePath);
    //     } else {
    //         navigate(`/${rolePath}`);
    //     }
    // }, [userData]);
    const onSubmit = (e) => {
        e.preventDefault();
        console.log(email, password);
        axios
            .post("http://localhost:8000/api/auth/login", {
                email: email,
                password: password,
            })
            .then((response) => {
                dispatch(logginSuccess(response.data.user));
                setInterval(() => {
                    navigate(`/${rolePath}`);
                }, 1000);
            });
    };
    return (
        <div className="cardAuth h-[75vh] w-[60%] flex justify-between rounded-lg shadow-lg bg-bgColor overflow-auto media-max-md:h-full media-max-md:w-full media-max-md:flex-col media-max-md:p-6">
            <div className="imageDiv flex justify-center basis-1/2 h-full m-0 text-center rounded-lg overflow-hidden relative shadow-2xl">
                <img
                    src={backgroundImage}
                    alt="Backgound Image"
                    className="h-full w-full absolute object-cover top-0 bottom-0 right-0 left-0"
                />
                <div className="textDiv relative">
                    <h2 className="title relative top-[20%] text-whiteColor text-h1FontSize font-extrabold media-max-md:text-h3FontSize">
                        Phân hiệu Trường Đại học Thủy lợi
                    </h2>
                </div>
            </div>
            <div className="formDiv flex flex-col basis-1/2 m-auto p-2 items-center gap-6 translate-y-[-1rem] media-max-md:translate-y-[-0.5rem]">
                <div className="headerDiv text-center flex flex-col items-center">
                    <img
                        src={logoMini}
                        alt="Logo Image"
                        className="w-40 media-max-md:w-44"
                    />
                    <h3 className="title text-h1FontSize text-blackColor font-semibold media-max-md:text-h2FontSize">
                        Welcome Back!
                    </h3>
                </div>
                <form onSubmit={onSubmit} className="form grid gap-4">
                    <span className="showMessage block text-whiteColor p-3 bg-red-600 rounded-lg text-center">
                        Login Status will go here
                    </span>
                    <div className="inputDiv">
                        <label
                            htmlFor="username"
                            className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                        >
                            Username
                        </label>
                        <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                            <FaUserShield className="icon" />
                            <input
                                type="text"
                                id="username"
                                placeholder="Enter Username or Email"
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                                className="bg-transparent outline-none border-none w-[200px] media-max-md:w-full"
                            />
                        </div>
                    </div>
                    <div className="inputDiv">
                        <label
                            htmlFor="password"
                            className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                        >
                            Password
                        </label>
                        <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                            <BsFillShieldLockFill className="icon" />
                            <input
                                type="text"
                                id="password"
                                placeholder="Enter Password or Email"
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="bg-transparent outline-none border-none w-[200px] media-max-md:w-full"
                            />
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="button flex p-3 bg-PrimaryColor rounded-lg text-whiteColor items-center justify-center m-auto text-16 w-full gap-2 duration-300 ease-in-out group"
                    >
                        <span>Login</span>
                        <AiOutlineSwapRight className="icon text-[25px] group-hover:translate-x-2" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CardAuth;
