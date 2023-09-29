import { useForm } from "react-hook-form";
import { FaUserShield } from "react-icons/fa";
import { Link } from "react-router-dom";
import pathRoutes from "../utils/pathRoutes";
import ButtonConfirm from "../components/button/ButtonConfirm";
import { apiAdmin, apiChangePassword } from "../redux/apiRequest";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";

const ChangePassword = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const [showPassword, setShowPassword] = useState(false);

    const {
        register,
        formState: { errors },
        handleSubmit,
        getValues,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        const id = toast.loading("Please wait...");
        await apiAdmin
            .apiChangePassword(
                currentUser,
                data.oldPassword,
                data.confirmPassword
            )
            .then((res) => {
                if (res?.errCode > 0) {
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
                className="formDiv flex flex-col gap-2 media-min-md:w-[35%] w-[100%]"
            >
                {/* <div>
                    <label className="labelInput">
                        Old Password
                    </label>
                    <input
                        className="input"
                        {...register("oldPassword", {
                            required: "Old password is required",
                        })}
                    />
                    {errors.oldPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.oldPassword?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="labelInput">
                        New Password
                    </label>
                    <input
                        className="input"
                        {...register("newPassword", {
                            required: "New password is required",
                        })}
                    />
                    {errors.newPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.newPassword?.message}
                        </p>
                    )}
                </div>
                <div>
                    <label className="labelInput">
                        Confirm Password
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
                    {errors.confirmPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div> */}
                <div className="w-full">
                    <label className="labelInput">Old Password</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="oldPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("oldPassword", {
                                required: "Old Password is required",
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
                    {errors.oldPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.oldPassword?.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label className="labelInput">New Password</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="confirmPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("confirmPassword", {
                                required: "New Password is required",
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
                    {errors.confirmPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>
                <div className="w-full">
                    <label className="labelInput">Confirm Password</label>
                    <div className="input flex justify-between p-2 bg-whiteColor rounded-lg items-center w-full">
                        <input
                            type={`${showPassword ? "text" : "password"}`}
                            id="confirmPassword"
                            placeholder=""
                            className="bg-transparent outline-none border-none w-full media-max-md:w-full"
                            {...register("confirmPassword", {
                                required: "Confirm Password is required",
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
                    {errors.confirmPassword?.type && (
                        <p className=" text-normal text-red-500">
                            {errors.confirmPassword?.message}
                        </p>
                    )}
                </div>
                <ButtonConfirm />
            </form>
        </div>
    );
};

export default ChangePassword;
