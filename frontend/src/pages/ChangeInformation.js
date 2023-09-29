import { Controller, set, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
    apiAdmin,
    apiChangeInformation,
    apiChangePassword,
    apiGetInformation,
} from "../redux/apiRequest";
import ButtonConfirm from "../components/button/ButtonConfirm";
import { useEffect, useState } from "react";
import Avatar from "react-avatar-edit";
import ModalPopup from "../components/ModelPopup/ModalPopup";
import { FaPenAlt } from "react-icons/fa";
import { Buffer } from "buffer";
import Select from "react-select";
import { customSelectStyles } from "../utils/customStyleReactSelect";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment/moment";

const ChangeInformation = () => {
    const currentUser = useSelector((state) => state.auth.currentUser);
    const gender = useSelector((state) => state.admin.gender);
    const informationUser = useSelector((state) => state.admin.information);
    const dispatch = useDispatch();
    const [showModal, setShowModal] = useState(false);
    const [srcImg, setSrcImg] = useState(
        "https://png.pngtree.com/png-vector/20191026/ourlarge/pngtree-avatar-vector-icon-white-background-png-image_1870181.jpg"
    );
    const [previewImg, setPreviewImg] = useState(null);
    const {
        register,
        formState: { errors },
        handleSubmit,
        control,
        getValues,
        setValue,
        reset,
    } = useForm();
    const onSubmit = async (data) => {
        const id = toast.loading("Please wait...");
        const datasend = {
            ...data,
            image: previewImg
                ? previewImg
                : new Buffer(informationUser?.image, "base64").toString(
                      "binary"
                  ),
            birthday: new Date(moment(data.birthday, "DD/MM/YYYY")).toLocaleDateString("vi-VN"),
        };
        // console.log(datasend);
        await apiAdmin
            .apiChangeInformation(currentUser, datasend)
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
                    // reset();
                }
            })
            .catch((error) => {
                // console.log(error);
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
    const onClose = () => {
        setPreviewImg(null);
    };
    const onCrop = (view) => {
        setPreviewImg(view);
    };
    const onBeforeFileLoad = (elem) => {
        if (elem.target.files[0].size > 5242880) {
            toast.warning("File is too big, plz upload file below 5MB!");
            elem.target.value = "";
        }
    };
    useEffect(() => {
        // console.log("useEffect changeInfor");
        apiAdmin.apiGetInformation(currentUser, dispatch);
        apiAdmin.apiGetGender(currentUser, dispatch);
    }, [handleSubmit]);
    useEffect(() => {
        if (informationUser?.image) {
            const imageBuffer = new Buffer(
                informationUser?.image,
                "base64"
            ).toString("binary");
            setSrcImg(imageBuffer);
        }
        setValue("fullName", informationUser?.fullName);
        setValue("numberPhone", informationUser?.numberPhone);
        setValue("address", informationUser?.address);
        setValue("birthday", informationUser?.birthday);
        // console.log(informationUser?.birthday,moment(informationUser?.birthday, "DD/MM/YYYY").toString());
        setValue(
            "gender",
            gender.filter(
                (gender) => gender?.value === informationUser?.genderId
            )
        );
    }, [informationUser]);
    return (
        <div className="changeInformationDiv flex justify-center items-center">
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="formDiv flex flex-col gap-2  media-min-md:w-[80%]"
            >
                {/* <div>
                    <label
                        htmlFor="username"
                        className="text-blackColor font-normal text-h3FontSize px-2 py-0 block"
                    >
                        Username
                    </label>
                    <div className="input flex gap-2 p-4 bg-inputColor rounded-lg items-center">
                        <FaUserShield className="icon" />
                        <input
                            className="input"
                            {...register("oldPassword", { required: true })}
                        />
                       
                    </div>
                    {errors.oldPassword?.type && (
                            <p className=" text-normal text-red-500">
                                Old password is required
                            </p>
                        )}
                </div> */}
                <div className="row flex justify-center items-center w-full">
                    <div className="w-28 h-28 p-1 bg-whiteColor rounded-full relative">
                        <img
                            src={previewImg ? previewImg : srcImg}
                            className="w-[6.5rem] h-[6.5rem] rounded-full"
                        />
                        <div
                            className="absolute bottom-0 right-1 rounded-full p-2 bg-whiteColor"
                            onClick={() => {
                                setShowModal(true);
                            }}
                        >
                            <FaPenAlt className="icon" />
                        </div>
                    </div>

                    <ModalPopup
                        showModal={showModal}
                        setShowModal={setShowModal}
                        title={"Change Avatar"}
                        result={previewImg}
                        setResult={setPreviewImg}
                    >
                        <div className="">
                            <Avatar
                                // src={srcImg}
                                width={250}
                                height={250}
                                imageHeight={250}
                                onBeforeFileLoad={onBeforeFileLoad}
                                onCrop={onCrop}
                                onClose={onClose}
                            />
                        </div>
                    </ModalPopup>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Full name</label>
                        <input
                            className="input"
                            {...register("fullName", {
                                required: "Full name is required",
                            })}
                        />
                        {errors.fullName?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.fullName?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Number phone</label>
                        <input
                            className="input"
                            {...register("numberPhone", {
                                required: "Number phone is required",
                            })}
                        />
                        {errors.numberPhone?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.numberPhone?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full">
                        <label className="labelInput">Address</label>
                        <input
                            className="input"
                            {...register("address", {
                                // required: "Full name is required",
                            })}
                        />
                        {errors.address?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.address?.message}
                            </p>
                        )}
                    </div>
                </div>
                <div className="row flex justify-center items-center gap-2">
                    <div className="col w-full flex flex-col">
                        <label className="labelInput">Birthday</label>
                        <Controller
                            name="birthday"
                            control={control}
                            {...register("birthday", {
                                // required: "Full name is required",
                            })}
                            render={({ field: { onChange, value } }) => (
                                <DatePicker
                                    className="input"
                                    dateFormat="dd/MM/yyyy"
                                    selected={
                                        value
                                            ? new Date(
                                                  moment(
                                                      value,
                                                      "DD/MM/YYYY"
                                                  ).toString()
                                              )
                                            : new Date()
                                    }
                                    // closeOnScroll={true}
                                    onChange={onChange}
                                />
                            )}
                        />
                        {errors.birthday?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.birthday?.message}
                            </p>
                        )}
                    </div>
                    <div className="col w-full">
                        <label className="labelInput">Gender</label>
                        <Controller
                            name="gender"
                            control={control}
                            {...register("gender", {
                                // required: "Full name is required",
                            })}
                            render={({ field }) => (
                                <Select
                                    styles={customSelectStyles}
                                    {...field}
                                    options={gender}
                                    isClearable={true}
                                />
                            )}
                        />
                        {errors.gender?.type && (
                            <p className=" text-normal text-red-500">
                                {errors.gender?.message}
                            </p>
                        )}
                    </div>
                </div>
                <ButtonConfirm />
            </form>
        </div>
    );
};

export default ChangeInformation;
