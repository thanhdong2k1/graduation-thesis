import { useForm } from "react-hook-form";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import { createAxios } from "../../utils/createInstance";
import { logginSuccess } from "../../redux/authSlice";
import ButtonConfirm from "../../components/button/ButtonConfirm";
import { apiStudent } from "../../redux/apiRequest";

const StudentChangePassword = () => {

    const currentUser = useSelector((state) => state?.auth?.currentUser);
    const dispatch = useDispatch();
    let axiosJWT = createAxios(currentUser, dispatch, logginSuccess);
    
    const [showPassword1, setShowPassword1] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [showPassword3, setShowPassword3] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        const id = toast.loading("Vui lòng đợi...");
        await apiStudent
            .apiStudentChangePassword(
                currentUser,
                data?.oldPassword,
                data?.confirmPassword,
                axiosJWT
            )
            .then((res) => {
                if (res?.errCode > 0 || res?.errCode < 0 ) {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "error",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                } else {
                    // console.log(res);
                    toast.update(id, {
                        render: res?.errMessage,
                        type: "success",
                        isLoading: false,
                        closeButton: true,
                        autoClose: 1500,
                        pauseOnFocusLoss: true,
                    });
                    reset();
                }
            })
            .catch((error) => {
                // console.log(error);
                toast.update(id, {
                    render: "Đã xảy ra lỗi, vui lòng thử lại sau!",
                    type: "error",
                    isLoading: false,
                    closeButton: true,
                    autoClose: 1500,
                    pauseOnFocusLoss: true,
                });
            });
        // console.log(data);

        // // console.log(res);
        // toast.error("Wow so easy !");
        // // reset();
    };

    return (
        <div className="changePasswordDiv flex justify-center items-center ">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2 media-min-md:w-[45%] w-[100%]"
            >
                {/* <div>
                    <label className="labelInput">
                        Mật khẩu cũ
                    </label>
                    <input
                        className="input"
                        {...register("oldPassword", {
                            required: "Old password is required",
                        })}
                    />
                    {errors?.oldPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.oldPassword?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="labelInput">
                        Mật khẩu mới
                    </label>
                    <input
                        className="input"
                        {...register("newPassword", {
                            required: "New password is required",
                        })}
                    />
                    {errors?.newPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.newPassword?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="labelInput">
                        Nhập lại mật khẩu
                    </label>
                    <input
                        className="input"
                        {...register("confirmPassword", {
                            required: "Confirm password is required",
                            validate: (value) => {
                                return value !== getValues("newPassword")
                                    ? "Passwords are not the same"
                                    : null;
                            },
                        })}
                    />
                    {errors?.confirmPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.confirmPassword?.message}
                        </p>
                    )}
                </div> */}
                <div className="w-full">
                    <label className="labelInput">Mật khẩu cũ</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword1 ? "text" : "password"}`}
                            id="oldPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("oldPassword", {
                                required: "Mật khẩu cũ is required",
                            })}
                        />
                        {showPassword1 ? (
                            <FaEye
                                className="icon"
                                onClick={() => {
                                    setShowPassword1(false);
                                }}
                            />
                        ) : (
                            <FaEyeSlash
                                className="icon"
                                onClick={() => {
                                    setShowPassword1(true);
                                }}
                            />
                        )}
                    </div>
                    {errors?.oldPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.oldPassword?.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label className="labelInput">Mật khẩu mới</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword2 ? "text" : "password"}`}
                            id="confirmPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("newPassword", {
                                required: "Mật khẩu mới is required",
                            })}
                        />
                        {showPassword2 ? (
                            <FaEye
                                className="icon"
                                onClick={() => {
                                    setShowPassword2(false);
                                }}
                            />
                        ) : (
                            <FaEyeSlash
                                className="icon"
                                onClick={() => {
                                    setShowPassword2(true);
                                }}
                            />
                        )}
                    </div>
                    {errors?.newPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.newPassword?.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label className="labelInput">Nhập lại mật khẩu</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword3 ? "text" : "password"}`}
                            id="confirmPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("confirmPassword", {
                                required: "Nhập lại mật khẩu is required",
                                validate: (value) => {
                                    const {newPassword} = getValues();
                                    return value == newPassword || "The password is not the same!";
                                  }
                            })}
                        />
                        {showPassword3 ? (
                            <FaEye
                                className="icon"
                                onClick={() => {
                                    setShowPassword3(false);
                                }}
                            />
                        ) : (
                            <FaEyeSlash
                                className="icon"
                                onClick={() => {
                                    setShowPassword3(true);
                                }}
                            />
                        )}
                    </div>
                    {errors?.confirmPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors?.confirmPassword?.message}
                        </p>
                    )}
                </div>
                <ButtonConfirm />
            </form>
        </div>
    );
};

export default StudentChangePassword;
