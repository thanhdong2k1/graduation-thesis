import { FaEye, FaEyeSlash, FaUserShield } from "react-icons/fa6";
import backgroundImage from "../../assets/background.png";
import logoMini from "../../assets/logo_Mini.png";
import { BsFillShieldLockFill } from "react-icons/bs";
import { AiOutlineSwapRight } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { logginSuccess } from "../../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { MdKeyboardBackspace } from "react-icons/md";
import { apiAuth, logginUser } from "../../redux/apiRequest";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { getErrMessageSuccess } from "../../redux/adminSlice";
const CardAuth = () => {
    const dispatch = useDispatch();
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm();
    const [showMessage, setShowMessage] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const currentUser = useSelector((state) => state.auth.currentUser);
    const stateAuth = useSelector((state) => state.auth);
    const rolePath =
        currentUser?.roleId == "R1"
            ? "admin"
            : currentUser?.roleId == "R2"
            ? "dean"
            : currentUser?.roleId == "R3"
            ? "lecturer"
            : currentUser?.roleId == "R4"
            ? "student"
            : "";
    // console.log(rolePath);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const onSubmit = async (data) => {
        const id = toast.loading("Please wait...");
        console.log(data);
        await apiAuth
            .logginUser({
                data: data,
                dispatch: dispatch,
                navigate: navigate,
            })
            .then((res) => {
                // console.log(res);
                if (res?.errCode > 0) {
                    console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                } else {
                    console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "success",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                    // reset();

                    if (res?.user?.roleId == "R1") {
                        navigate("/admin");
                    } else if (res?.user?.roleId == "R2") {
                        navigate("/dean");
                    } else if (res?.user?.roleId == "R3") {
                        navigate("/lecturer");
                    } else if (res?.user?.roleId == "R4") {
                        navigate("/student");
                    }
                }
            })
            .catch((err) => {
                console.log(err);
                toast.update(id, {
                    render: "Đã xảy ra lỗi, vui lòng thử lại sau",
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    autoClose: 1500,
                    pauseOnFocusLoss: true,
                });
            });
    };

    useEffect(() => {
        console.log("Đã useffect");
        if (rolePath == "") {
            // console.log("Đã vào");
            navigate("/login");
        } else {
            navigate(`/${rolePath}`);
        }
    }, [currentUser]);
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
                        Chào mừng trở lại!
                    </h3>
                </div>
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="formDiv grid gap-4"
                >
                    {showMessage && (
                        <span className="showMessage block text-whiteColor p-3 bg-red-600 rounded-lg text-center w-[250px]">
                            {showMessage}
                        </span>
                    )}
                    <div className="inputDiv">
                        <label
                            htmlFor="email"
                            className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                        >
                            Tài khoản
                        </label>
                        <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                            <FaUserShield className="icon" />
                            <input
                                type="text"
                                id="email"
                                placeholder="Nhập username hoặc email"
                                {...register("email", {
                                    required: "Username or Email is required",
                                })}
                                className="bg-transparent outline-none border-none w-[200px] media-max-md:w-full"
                            />
                        </div>
                        {errors.email?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.email?.message}
                            </p>
                        )}
                    </div>
                    <div className="inputDiv">
                        <label
                            htmlFor="password"
                            className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                        >
                            Mật khẩu
                        </label>
                        <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                            <BsFillShieldLockFill className="icon" />
                            <input
                                type={`${showPassword ? "text" : "password"}`}
                                id="password"
                                placeholder="Nhập mật khẩu"
                                className="bg-transparent outline-none border-none w-[200px] media-max-md:w-full"
                                {...register("password", {
                                    required: "Password is required",
                                })}
                            />
                            {showPassword ? (
                                <FaEye
                                    className="icon"
                                    onClick={() => {
                                        setShowPassword(false);
                                    }}
                                />
                            ) : (
                                <FaEyeSlash
                                    className="icon"
                                    onClick={() => {
                                        setShowPassword(true);
                                    }}
                                />
                            )}
                        </div>
                        {errors.password?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.password?.message}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        className="button flex p-3 bg-PrimaryColor rounded-lg text-whiteColor items-center justify-center m-auto text-16 w-full gap-2 duration-300 ease-in-out group"
                    >
                        {stateAuth?.isFetching ? (
                            <>
                                <svg
                                    aria-hidden="true"
                                    role="status"
                                    class="inline mr-3 w-4 h-4 text-white animate-spin"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="#E5E7EB"
                                    ></path>
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentColor"
                                    ></path>
                                </svg>
                                <span>Đang tải...</span>
                            </>
                        ) : (
                            <>
                                <span>Đăng nhập</span>
                                <AiOutlineSwapRight className="icon text-[25px] group-hover:translate-x-2" />
                            </>
                        )}
                    </button>
                </form>
                <Link to={"/"} className="backLink button">
                    <MdKeyboardBackspace className="mr-2" />
                    <span className="title">Quay lại!</span>
                </Link>
            </div>
        </div>
    );
};

export default CardAuth;
